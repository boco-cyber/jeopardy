        let gameData = {
            teams: [],
            rows: 5,
            cols: 6,
            categories: [],
            questions: [],
            answeredQuestions: new Set(),
            title: 'JEOPARDY!',
            timerEnabled: false,
            timerSeconds: 30
        };

        let currentQuestion = null;
        let timerInterval = null;
        let timeRemaining = 0;

        // Initialize team name inputs on page load
        window.onload = function() {
            updateTeamNames();
        };

        function updateTeamNames() {
            const numTeams = parseInt(document.getElementById('numTeams').value);
            const container = document.getElementById('teamNamesInputs');
            container.innerHTML = '';

            for (let i = 0; i < numTeams; i++) {
                const inputDiv = document.createElement('div');
                inputDiv.className = 'team-name-input';
                inputDiv.innerHTML = `
                    <label>Team ${i + 1}:</label>
                    <input type="text" id="teamName${i}" placeholder="Team ${i + 1}" value="Team ${i + 1}">
                `;
                container.appendChild(inputDiv);
            }
        }

        // Sample data for when no Excel file is provided
        const sampleCategories = [
            "SCIENCE", "HISTORY", "GEOGRAPHY", "LITERATURE", "POP CULTURE", "SPORTS"
        ];

        const sampleQuestions = [
            // Science
            ["The chemical symbol for gold", "What is Au?"],
            ["The planet closest to the Sun", "What is Mercury?"],
            ["The powerhouse of the cell", "What is mitochondria?"],
            ["The speed of light in m/s", "What is 299,792,458?"],
            ["The first element on the periodic table", "What is Hydrogen?"],
            
            // History
            ["Year Christopher Columbus sailed to America", "What is 1492?"],
            ["First President of the United States", "Who is George Washington?"],
            ["The war that lasted from 1914-1918", "What is World War I?"],
            ["Ancient civilization that built pyramids", "Who are the Egyptians?"],
            ["Year the Berlin Wall fell", "What is 1989?"],
            
            // Geography
            ["The largest ocean on Earth", "What is the Pacific Ocean?"],
            ["Capital city of France", "What is Paris?"],
            ["The longest river in the world", "What is the Nile River?"],
            ["The smallest continent", "What is Australia?"],
            ["Country with the most population", "What is China (or India)?"],
            
            // Literature
            ["Author of Romeo and Juliet", "Who is William Shakespeare?"],
            ["Book that starts with 'Call me Ishmael'", "What is Moby Dick?"],
            ["Author of Harry Potter series", "Who is J.K. Rowling?"],
            ["Greek epic poem by Homer", "What is The Odyssey (or The Iliad)?"],
            ["Novel featuring Big Brother", "What is 1984?"],
            
            // Pop Culture
            ["Movie with the line 'May the Force be with you'", "What is Star Wars?"],
            ["King of Pop", "Who is Michael Jackson?"],
            ["Streaming service with original shows", "What is Netflix?"],
            ["Popular battle royale video game", "What is Fortnite?"],
            ["Social media app with disappearing photos", "What is Snapchat?"],
            
            // Sports
            ["Sport associated with the Super Bowl", "What is American Football?"],
            ["Number of players on a soccer team", "What is 11?"],
            ["Country that hosted 2016 Olympics", "What is Brazil?"],
            ["Sport Tiger Woods plays", "What is Golf?"],
            ["Michael Jordan's NBA team", "What are the Chicago Bulls?"]
        ];

        function downloadTemplate() {
            const wb = XLSX.utils.book_new();
            const rows = parseInt(document.getElementById('numRows').value);
            const cols = parseInt(document.getElementById('numCols').value);
            
            const wsData = [];
            const headerRow = ['Points'];
            for (let c = 0; c < cols; c++) {
                headerRow.push(`Category ${c + 1}`);
            }
            wsData.push(headerRow);
            
            for (let r = 0; r < rows; r++) {
                const pointValue = (r + 1) * 200;
                const questionRow = [pointValue];
                const answerRow = [''];
                
                for (let c = 0; c < cols; c++) {
                    questionRow.push(`Question ${r + 1} for Category ${c + 1}`);
                    answerRow.push(`Answer ${r + 1} for Category ${c + 1}`);
                }
                
                wsData.push(questionRow);
                wsData.push(answerRow);
            }
            
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, "Jeopardy Questions");
            XLSX.writeFile(wb, "jeopardy_template.xlsx");
        }

        async function startGame() {
            const numTeams = parseInt(document.getElementById('numTeams').value);
            const numRows = parseInt(document.getElementById('numRows').value);
            const numCols = parseInt(document.getElementById('numCols').value);
            const fileInput = document.getElementById('excelFile');
            const customTitle = document.getElementById('gameTitle').value.trim() || 'JEOPARDY!';
            const timerEnabled = document.getElementById('timerEnabled').checked;
            const timerSeconds = parseInt(document.getElementById('timerSeconds').value) || 30;

            console.log('Starting game with:', {numTeams, numRows, numCols, customTitle, timerEnabled, timerSeconds});

            gameData.title = customTitle;
            gameData.timerEnabled = timerEnabled;
            gameData.timerSeconds = timerSeconds;

            gameData.teams = [];
            for (let i = 0; i < numTeams; i++) {
                const teamNameInput = document.getElementById(`teamName${i}`);
                const teamName = teamNameInput && teamNameInput.value.trim() 
                    ? teamNameInput.value.trim() 
                    : `Team ${i + 1}`;
                
                gameData.teams.push({
                    name: teamName,
                    score: 0
                });
            }

            gameData.rows = numRows;
            gameData.cols = numCols;
            gameData.answeredQuestions = new Set();

            console.log('gameData.rows:', gameData.rows);
            console.log('gameData.cols:', gameData.cols);

            if (fileInput.files.length > 0) {
                await loadExcelFile(fileInput.files[0], numRows, numCols);
            } else {
                loadSampleData(numRows, numCols);
            }

            console.log('After loading - gameData.questions.length:', gameData.questions.length);
            console.log('After loading - gameData.categories.length:', gameData.categories.length);

            document.getElementById('setupScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';

            renderGame();
        }

        function loadSampleData(rows, cols) {
            gameData.categories = sampleCategories.slice(0, cols);
            gameData.questions = [];

            for (let r = 0; r < rows; r++) {
                const row = [];
                for (let c = 0; c < cols; c++) {
                    const index = c * 5 + r;
                    const [question, answer] = sampleQuestions[index] || [`Sample Question ${r + 1}`, `Sample Answer ${r + 1}`];
                    row.push({
                        value: (r + 1) * 200,
                        question: question,
                        answer: answer
                    });
                }
                gameData.questions.push(row);
            }
        }

        async function loadExcelFile(file, rows, cols) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });

                        console.log('Loaded Excel data:', jsonData);
                        console.log('Total rows in Excel:', jsonData.length);

                        // Read categories from first row (skip first column which is "Points")
                        gameData.categories = [];
                        for (let c = 1; c <= cols && c < jsonData[0].length; c++) {
                            gameData.categories.push(jsonData[0][c] || `Category ${c}`);
                        }

                        gameData.questions = [];
                        
                        // Each question takes 2 rows: one for the question, one for the answer
                        // Row 0 is headers, so questions start at row 1
                        for (let r = 0; r < rows; r++) {
                            const row = [];
                            const questionRowIndex = r * 2 + 1;  // 1, 3, 5, 7...
                            const answerRowIndex = r * 2 + 2;     // 2, 4, 6, 8...
                            
                            // Check if rows exist
                            if (questionRowIndex >= jsonData.length) {
                                console.log(`Question row ${questionRowIndex} doesn't exist, using default`);
                                break;
                            }

                            const pointValue = jsonData[questionRowIndex] && jsonData[questionRowIndex][0] 
                                ? jsonData[questionRowIndex][0] 
                                : (r + 1) * 200;

                            for (let c = 0; c < cols; c++) {
                                let question = '';
                                let answer = '';

                                // Get question from the question row
                                if (jsonData[questionRowIndex] && jsonData[questionRowIndex][c + 1] !== undefined) {
                                    question = String(jsonData[questionRowIndex][c + 1]);
                                }

                                // Get answer from the answer row (next row)
                                if (jsonData[answerRowIndex] && jsonData[answerRowIndex][c + 1] !== undefined) {
                                    answer = String(jsonData[answerRowIndex][c + 1]);
                                }

                                // If both are empty, use defaults
                                if (!question && !answer) {
                                    question = `Question ${r + 1}`;
                                    answer = `Answer ${r + 1}`;
                                }

                                row.push({
                                    value: pointValue,
                                    question: question || `Question ${r + 1}`,
                                    answer: answer || `Answer ${r + 1}`
                                });
                            }
                            gameData.questions.push(row);
                        }

                        console.log('Loaded questions:', gameData.questions);
                        console.log('Categories:', gameData.categories);
                        resolve();
                    } catch (error) {
                        console.error('Error reading Excel file:', error);
                        alert('Error reading Excel file: ' + error.message + '. Using sample data instead.');
                        loadSampleData(rows, cols);
                        resolve();
                    }
                };
                reader.onerror = () => {
                    alert('Error reading file. Using sample data instead.');
                    loadSampleData(rows, cols);
                    resolve();
                };
                reader.readAsArrayBuffer(file);
            });
        }

        function renderGame() {
            document.querySelector('.game-title').textContent = gameData.title;
            renderScores();
            renderBoard();
        }

        function renderScores() {
            const container = document.getElementById('scoresContainer');
            container.innerHTML = '';

            gameData.teams.forEach((team, index) => {
                const teamDiv = document.createElement('div');
                teamDiv.className = 'team-score';
                teamDiv.innerHTML = `
                    <div class="team-name">${team.name}</div>
                    <div class="team-points">$${team.score}</div>
                    <div class="manual-points">
                        <button onclick="adjustPoints(${index}, -100)">-100</button>
                        <button onclick="adjustPoints(${index}, 100)">+100</button>
                        <input type="number" id="customPoints${index}" placeholder="±" style="width: 70px;">
                        <button onclick="adjustCustomPoints(${index})">Apply</button>
                    </div>
                `;
                container.appendChild(teamDiv);
            });
        }

        function adjustPoints(teamIndex, amount) {
            gameData.teams[teamIndex].score += amount;
            renderScores();
        }

        function adjustCustomPoints(teamIndex) {
            const input = document.getElementById(`customPoints${index}`);
            const amount = parseInt(input.value);
            if (!isNaN(amount)) {
                gameData.teams[teamIndex].score += amount;
                input.value = '';
                renderScores();
            }
        }

        function renderBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';

            console.log('renderBoard called - rows:', gameData.rows, 'cols:', gameData.cols);
            console.log('renderBoard - questions array length:', gameData.questions.length);

            const categoryRow = document.createElement('div');
            categoryRow.className = 'board-row';
            categoryRow.style.gridTemplateColumns = `repeat(${gameData.cols}, 1fr)`;

            gameData.categories.forEach(category => {
                const cell = document.createElement('div');
                cell.className = 'category-cell';
                cell.textContent = category;
                categoryRow.appendChild(cell);
            });
            board.appendChild(categoryRow);

            for (let r = 0; r < gameData.rows; r++) {
                console.log(`Creating row ${r}`);
                const row = document.createElement('div');
                row.className = 'board-row';
                row.style.gridTemplateColumns = `repeat(${gameData.cols}, 1fr)`;

                for (let c = 0; c < gameData.cols; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'question-cell';
                    const questionId = `${r}-${c}`;
                    
                    if (gameData.answeredQuestions.has(questionId)) {
                        cell.classList.add('answered');
                    }

                    if (gameData.questions[r] && gameData.questions[r][c]) {
                        cell.textContent = `$${gameData.questions[r][c].value}`;
                        cell.onclick = () => openQuestion(r, c);
                    } else {
                        cell.textContent = `$${(r + 1) * 200}`;
                        console.warn(`Missing question data at row ${r}, col ${c}`);
                    }
                    row.appendChild(cell);
                }
                board.appendChild(row);
            }
            console.log('renderBoard complete - total rows added:', gameData.rows);
        }

        function openQuestion(row, col) {
            const questionId = `${row}-${col}`;
            if (gameData.answeredQuestions.has(questionId)) return;

            currentQuestion = { row, col, id: questionId };
            const q = gameData.questions[row][col];

            document.getElementById('modalValue').innerHTML = `$${q.value}`;
            document.getElementById('modalQuestion').textContent = q.question;
            document.getElementById('modalAnswer').textContent = q.answer;
            document.getElementById('modalAnswer').style.display = 'none';
            document.getElementById('showAnswerBtn').style.display = 'inline-block';

            // Show modal first
            document.getElementById('questionModal').style.display = 'flex';

            renderTeamButtons();

            // Timer setup - start after modal is visible
            const timerDiv = document.getElementById('timerDisplay');
            if (gameData.timerEnabled) {
                timerDiv.style.display = 'block';
                // Small delay to ensure modal is rendered
                setTimeout(() => {
                    startTimer();
                }, 100);
            } else {
                timerDiv.style.display = 'none';
            }
        }

        function startTimer() {
            // Clear any existing timer
            if (timerInterval) {
                clearInterval(timerInterval);
            }

            timeRemaining = gameData.timerSeconds;
            const timerDiv = document.getElementById('timerDisplay');
            
            console.log('Starting timer with', timeRemaining, 'seconds');
            console.log('Timer div exists:', !!timerDiv);
            
            if (!timerDiv) {
                console.error('Timer display element not found!');
                return;
            }

            timerDiv.style.display = 'block';
            timerDiv.className = 'timer-display';
            timerDiv.textContent = timeRemaining;

            console.log('Timer initialized, display:', timerDiv.style.display);

            timerInterval = setInterval(() => {
                timeRemaining--;
                timerDiv.textContent = timeRemaining;

                // Change colors based on time remaining
                if (timeRemaining <= 5) {
                    timerDiv.className = 'timer-display danger';
                } else if (timeRemaining <= 10) {
                    timerDiv.className = 'timer-display warning';
                }

                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    timerDiv.textContent = "TIME'S UP!";
                }
            }, 1000);
        }

        function stopTimer() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }

        function renderTeamButtons() {
            const container = document.getElementById('teamButtons');
            container.innerHTML = '';

            gameData.teams.forEach((team, index) => {
                const btn = document.createElement('button');
                btn.className = 'team-btn';
                btn.textContent = team.name;
                btn.onclick = () => awardPoints(index, true);
                container.appendChild(btn);

                const incorrectBtn = document.createElement('button');
                incorrectBtn.className = 'team-btn';
                incorrectBtn.textContent = `${team.name} ✗`;
                incorrectBtn.style.opacity = '0.6';
                incorrectBtn.onclick = () => awardPoints(index, false);
                container.appendChild(incorrectBtn);
            });
        }

        function showAnswer() {
            document.getElementById('modalAnswer').style.display = 'block';
            document.getElementById('showAnswerBtn').style.display = 'none';
        }

        function awardPoints(teamIndex, correct) {
            if (!currentQuestion) return;

            const q = gameData.questions[currentQuestion.row][currentQuestion.col];
            const points = correct ? q.value : -q.value;
            
            gameData.teams[teamIndex].score += points;
            gameData.answeredQuestions.add(currentQuestion.id);

            stopTimer();
            renderScores();
            renderBoard();
            closeModal();
        }

        function closeModal() {
            stopTimer();
            document.getElementById('questionModal').style.display = 'none';
            currentQuestion = null;
        }

        function resetGame() {
            if (confirm('Start a new game? This will reset all scores and questions.')) {
                document.getElementById('gameScreen').style.display = 'none';
                document.getElementById('setupScreen').style.display = 'flex';
                document.getElementById('excelFile').value = '';
            }
        }

        window.onclick = function(event) {
            const modal = document.getElementById('questionModal');
            if (event.target == modal) {
                closeModal();
            }
        }
    </script>
