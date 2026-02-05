document.addEventListener('DOMContentLoaded', () => {
    const teamListEl = document.getElementById('teamList');
    const totalSharesEl = document.getElementById('totalShares');
    const totalCostEl = document.getElementById('totalCost');
    const simulateBtn = document.getElementById('simulateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultsSection = document.getElementById('resultsSection');

    // State
    let cart = {}; // { teamName: quantity }

    // Render Teams
    TEAMS_DATA.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <img src="${team.logo}" alt="${team.name} Logo" class="team-logo" onerror="this.src='https://via.placeholder.com/32'">
            
            <div class="team-info">
                <div class="team-header">
                    <span class="team-name">${team.name}</span>
                    <span class="team-opponent">vs ${team.opponent_short}</span>
                </div>
                <div class="team-probs">
                    <span class="prob-win">W: ${(team.win_prob * 100).toFixed(0)}%</span>
                    <span class="prob-draw">D: ${(team.draw_prob * 100).toFixed(0)}%</span>
                    <span class="prob-loss">L: ${(team.lose_prob * 100).toFixed(0)}%</span>
                </div>
            </div>

            <div class="team-price">$${team.price.toFixed(2)}</div>
            
            <div class="share-input-group">
                <input type="number" min="0" class="share-input" data-team="${team.name}" placeholder="0">
                <span>Shares</span>
            </div>
        `;
        teamListEl.appendChild(card);
    });

    // Event Listeners
    teamListEl.addEventListener('input', (e) => {
        if (e.target.classList.contains('share-input')) {
            const teamName = e.target.dataset.team;
            const value = parseInt(e.target.value) || 0;

            if (value > 0) {
                cart[teamName] = value;
            } else {
                delete cart[teamName];
            }

            updateSummary();
        }
    });

    simulateBtn.addEventListener('click', runSimulation);

    clearBtn.addEventListener('click', () => {
        if (!confirm('Are you sure you want to clear all shares?')) return;

        // Reset state
        cart = {};

        // Reset inputs
        const inputs = document.querySelectorAll('.share-input');
        inputs.forEach(input => input.value = '');

        // Update UI
        updateSummary();

        // Hide results if visible
        resultsSection.style.display = 'none';
        resultsSection.classList.remove('active');
    });

    function updateSummary() {
        let count = 0;
        let cost = 0;

        for (const [name, qty] of Object.entries(cart)) {
            const team = TEAMS_DATA.find(t => t.name === name);
            if (team) {
                count += qty;
                cost += qty * team.price;
            }
        }

        totalSharesEl.textContent = count;
        totalCostEl.textContent = '$' + cost.toFixed(2);

        simulateBtn.disabled = count === 0;
    }

    function runSimulation() {
        const investedTeams = Object.keys(cart).map(name => {
            const team = TEAMS_DATA.find(t => t.name === name);
            return { ...team, qty: cart[name] };
        });

        if (investedTeams.length === 0) return;

        if (investedTeams.length > 12) {
            if (!confirm(`You have selected ${investedTeams.length} teams. Calculating all scenarios (3^${investedTeams.length}) might freeze the browser. Do you want to continue?`)) {
                return;
            }
        }

        simulateBtn.textContent = 'Calculating...';
        simulateBtn.disabled = true;

        // Use setTimeout to allow UI to update before heavy calculation
        setTimeout(() => {
            try {
                const distribution = calculateDistribution(investedTeams);
                renderResults(distribution);
            } catch (err) {
                alert("Error during simulation: " + err.message);
                console.error(err);
            } finally {
                simulateBtn.textContent = 'Run Simulation';
                simulateBtn.disabled = false;
            }
        }, 50);
    }

    function calculateDistribution(teams) {
        // Recursive function to generate all scenarios
        // Each scenario is a tree leaf.
        // We want to aggregate scenarios by their "Outcome Probability" and "Outcome Value".

        let scenarios = [{ prob: 1, value: 0 }]; // Start with 1 scenario: 100% prob, $0 change (initial state relative to investment?)
        // Wait, the user wants "sum of the $ outcomes".
        // The base value is the initial investment. 
        // We should track the Final Value of the portfolio, or the Profit/Loss?
        // "outcome of that scenario ... in order to get a probability density distrbituion for my potential outcomes."
        // Usually "outcome" means final portfolio value, or profit.
        // Let's carry 'profit' starting at 0.
        // For each team, we branch into 3: Win, Draw, Lose.

        for (const team of teams) {
            const nextScenarios = [];

            const outcomes = [
                { type: 'win', prob: team.win_prob, delta: team.qty * team.win_gain },
                { type: 'draw', prob: team.draw_prob, delta: 0 },
                { type: 'lose', prob: team.lose_prob, delta: -(team.qty * team.lose_loss) }
            ];

            for (const scen of scenarios) {
                for (const out of outcomes) {
                    nextScenarios.push({
                        prob: scen.prob * out.prob,
                        value: scen.value + out.delta
                    });
                }
            }
            scenarios = nextScenarios;
        }

        // Aggregate outcomes by rounding value to nearest cent (or dollar) to bin them
        // To permit a nice chart, we should group nearby values.
        const bins = {};

        scenarios.forEach(scen => {
            const val = Math.round(scen.value * 100) / 100; // Round to 2 decimals
            // Actually, maybe bin by integers to reduce sparseness?
            // Let's keep 2 decimals for accuracy, but map to string key
            const key = val.toFixed(2);
            bins[key] = (bins[key] || 0) + scen.prob;
        });

        // Convert back to array and sort
        const sortedBins = Object.entries(bins)
            .map(([val, prob]) => ({ value: parseFloat(val), prob }))
            .sort((a, b) => a.value - b.value);

        return sortedBins;
    }

    let chartInstance = null;

    function renderResults(data) {
        resultsSection.style.display = 'block';
        resultsSection.classList.add('active');
        resultsSection.scrollIntoView({ behavior: 'smooth' });

        // Stats
        let ev = 0;
        let maxProfit = -Infinity;
        let maxLoss = Infinity;
        let probProfit = 0;

        // Flatten data for stats
        data.forEach(d => {
            ev += d.value * d.prob;
            if (d.value > maxProfit) maxProfit = d.value;
            if (d.value < maxLoss) maxLoss = d.value;
            if (d.value > 0) probProfit += d.prob;
        });

        // Safe bounds check
        if (!isFinite(maxProfit)) maxProfit = 0;
        if (!isFinite(maxLoss)) maxLoss = 0;

        document.getElementById('resExpectedValue').textContent = (ev >= 0 ? '+' : '') + '$' + ev.toFixed(2);
        document.getElementById('resMaxProfit').textContent = '+' + '$' + maxProfit.toFixed(2);
        document.getElementById('resMaxLoss').textContent = '$' + maxLoss.toFixed(2);
        document.getElementById('resProbProfit').textContent = (probProfit * 100).toFixed(1) + '%';

        // Chart Logic
        const canvas = document.getElementById('distributionChart');
        const ctx = canvas.getContext('2d');

        // Robustly destroy existing chart instance on this canvas
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }

        // Calculate symmetric limits for X axis to keep 0 in center
        const maxExtent = Math.max(Math.abs(maxProfit), Math.abs(maxLoss));

        // Round up to nearest 5 to avoid arbitrary decimals like 13.86
        // If maxExtent is small (<5), use 5.
        // If larger, round to nearest 5.
        let limit = Math.ceil(maxExtent / 5) * 5;
        if (limit === 0) limit = 5; // Default if no profit/loss

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Probability',
                    data: data.map(d => ({ x: d.value, y: d.prob })),
                    backgroundColor: data.map(d => d.value >= 0 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)'),
                    borderColor: data.map(d => d.value >= 0 ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)'),
                    borderWidth: 1,
                    // Fix bar width to be constant pixels (half of previous 40)
                    barThickness: 20,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: (items) => `Outcome: $${items[0].parsed.x.toFixed(2)}`,
                            label: (item) => `Probability: ${(item.parsed.y * 100).toFixed(4)}%`
                        }
                    },
                    legend: { display: false },
                    annotation: {
                        // If we had the annotation plugin, we could draw a line. 
                        // But native grid lines are safer without external dependencies.
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        offset: false, // Ensure grid lines align with values (center of bar)
                        title: { display: true, text: 'Profit / Loss ($)' },
                        grid: {
                            // Make zero line distinct but not "weird"
                            color: (context) => (context.tick && context.tick.value === 0) ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                            lineWidth: (context) => (context.tick && context.tick.value === 0) ? 2 : 1,
                            offset: false // Disable grid line offset if implicit
                        },
                        min: -limit,
                        max: limit,
                        ticks: {
                            // Force integers or neat steps
                            stepSize: limit / 5,
                            callback: function (value) {
                                // Remove decimals if it's an integer
                                if (Number.isInteger(value)) {
                                    return '$' + value;
                                }
                                return '$' + value.toFixed(2);
                            }
                        }
                    },
                    y: {
                        title: { display: true, text: 'Probability' },
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
