class FridayChatbot {
    constructor() {
        this.isRepeat = false;
        this.currentSongIndex = 0;
        this.timerInterval = null;
        this.audioPlayerChat = document.getElementById('audio-player-chat');
        this.audioPlayerContainerChat = document.getElementById('audio-player-container-chat');
        this.songTitleChat = document.getElementById('song-title-chat');
        this.playPauseBtnChat = document.getElementById('play-pause-btn-chat');
        this.timerDisplay = document.getElementById('timer-display');
        
        this.playlist = [
            { title: "Samajavaragamana", url: "https://www.dropbox.com/scl/fi/hyk0j59j1cuuebg602ivd/Samajavaragamana.mp3?rlkey=ebt7ly8g7ykt9hqhiodrjtek1&st=edlhb53z&dl=1" },
            { title: "Bagundu Bagundu Song", url: "https://www.dropbox.com/scl/fi/cbg9hxehlvcm0rvkcbae6/Bagundu-Bagundu.mp3?rlkey=yru56be3o6kefmetbfflzl89q&st=p31u7ndh&dl=1" },
            { title: "diwali song", url: "https://www.dropbox.com/scl/fi/s33wdxoduevh7z5vt4psd/Diwali-2018-Special-Song.mp3?rlkey=3clfvgx0vusnhn5mrxdhduddq&st=tevo3hjz&dl=1" },
          ];

        this.context = null; // Store the last command for follow-up actions
        this.contextTimeout = null; // Initialize context timeout
        this.contextAttempts = 0; // Track number of follow-up attempts
        
        this.responses = {
            greetings$hi: [
               "Good to see you, sir! How are you doing today?",
                "Greetings sir! How may I be of service?"
            ],
            greetings$hello: [
                "Hi sir! Is there anything else I can assist you with?",
                "Hello sir! I hope you're doing well."
            ],

            
            greetings$howareyou: [
                "Always ready to help, sir. How can I assist you today?",
                "I'm doing fine, thank you. Let me know how I can help you, sir."
            ],

           greetings$whatareyoudoing: [
            "Hello sir! I'm standing by for your next command.",
            "Hi sir! I'm waiting for your instructions."
        ],
        greetings$whoareyou: [
           "I am Friday: a conversational AI built by Mr. Hemanthravi. I operate under OpenPageFriday, a tech wing of K.EHBM.",
            "I'm Friday, your intelligent assistant. Powered by purpose, coded with care by Mr. Hemanthravi, and part of the OpenPageFriday system."
            ],







            
            //ai-chatbots

            claude95: [
                "Yes sir, Opening Claude AI for you!",
                "Got it sir, Opening Claude AI!",
                "Ok sir, Launching Claude AI.",
                "Yes sir, Opening Claude AI right now!"
            ],
            perplexity96: [
                "Yes sir, Opening Perplexity AI for you!",
                "Got it sir, Opening Perplexity AI!",
                "Ok sir, Launching Perplexity AI.",
                "Yes sir,Opening Perplexity AI right now!"
            ],
            meta97: [   
                "Yes sir, Opening Meta AI for you!",
                "Got it sir, Opening Meta AI!",
                "Ok sir, Launching Meta AI.",
                "Yes sir, Opening Meta AI right now!"
            ],
            chatgpt98: [
                "Yes sir, Opening ChatGPT for you!",
                "Got it sir, Opening ChatGPT!",
                "Ok sir, Launching ChatGPT.",
                "Yes sir, Opening ChatGPT right now!"
            ],
           
            grok99: [
                "Yes sir, Opening Grok AI for you!",
                "Got it sir, Opening Grok AI!",
                "Ok sir, Launching Grok AI.",
                "Yes sir, Opening Grok right now!"
            ],
            deepseek100: [
                "Yes sir, Opening DeepSeek AI for you!",
                "Got it sir, Opening DeepSeek AI!",
                "Ok sir, Launching DeepSeek AI.",
                "Yes sir, Opening DeepSeek right now!"
            ],
            qwen101: [
                "Yes sir, Opening Qwen AI for you!",
                "Got it sir, Opening Qwen AI!",
                "Ok sir, Launching Qwen AI.",
                "Yes sir, Opening Qwen AI right now!"
            ],
            copilot102: [
                "Yes sir, Opening Copilot AI for you!",
                "Got it sir, Opening Copilot AI!",
                "Ok sir, Launching Copilot AI.",
                "Yes sir, Opening Copilot right now!"
            ],
            wikipedia103: [
                "Yes sir, Opening Wikipedia for you!",
                "Got it sir, Opening Wikipedia!",
                "Ok sir, Launching Wikipedia.",
                "Yes sir, Opening Wikipedia right now!"
            ],
            removebg104: [
                "Yes sir, Opening Remove.bg for you!",
                "Got it sir, Opening Remove.bg!",
                "Ok sir, Launching Remove.bg.",
                "Yes sir, Opening Remove.bg right now!"
            ],

            //writing tools
            grammarly105: [
                "Yes sir, Opening Grammarly AI for you!",
                "Got it sir, Opening Grammarly AI!",
                "Ok sir, Launching Grammarly AI.",
                "Yes sir, Opening Grammarly AI right now!"
            ],
            duolingo106: [
                "Yes sir, Opening Duolingo for you!",
                "Got it sir, Opening Duolingo!",
                "Ok sir, Launching Duolingo.",
                "Yes sir, Opening Duolingo right now!"
            ],







            //own commands
            time: [
                "Right now it’s {time}.",
                "The current time is {time}.",
                "It’s {time} at the moment.",
                "Here’s the time: {time}."
            ],
            date: [
                "Today is {date}.",
                "The date today is {date}.",
                "It’s {date} today.",
                "Here’s today’s date: {date}."
            ],
            timer: [
                "Timer set for {seconds} seconds. I’ll let you know when it’s done!",
                "Starting a {seconds}-second timer for you!",
                "Timer’s on for {seconds} seconds—sit tight!",
                "I’ve set a timer for {seconds} seconds. Wait for my ping!"
            ],
            timerDone: [
                "Timer’s up! Time to get moving!",
                "Your timer just finished!",
                "Ding! Your {seconds}-second timer is done!",
                "Timer complete—hope that helped!"
            ],
            joke: [
                "Why did the computer go to school? It wanted to improve its *byte*!",
                "Here’s a quick one: Why don’t programmers prefer dark mode? Because the light attracts bugs!",
                "What do you call fake spaghetti? An *impasta*!",
                "Why was the math book sad? It had too many problems!"
            ],
            stopthesong: [
                "Ok sir, Stopping the song now!",
                "Yes sir, stopping the song!",
                "Alright Sir, stoping the music for you!"
            ],








            //responses for conversation facilities
            whatsMyIp: [
                "I can’t access your IP directly, but you can check it by searching 'what's my IP' on Google! Want me to open Google for you?"
            ],
            confirmYes: [
                "Opening Google now!"
            ],
            confirmNo: [
                "Alright, let me know what else I can help with!"
            ],
            setAlarm: [
                "I can’t set alarms directly, but I can set a timer for you! Would you like me to set a timer?"
            ],
            confirmTimer: [
                "How many seconds or minutes for the timer? (e.g., '5 seconds' or '2 minutes')"
            ],
            invalidTimer: [
                "Please specify a number followed by 'seconds' or 'minutes' (e.g., '5 seconds' or '2 minutes'). Try again!"
            ],
            openCalculator: [
                "I can help with calculations! Want to perform a math calculation now?"
            ],
            confirmMath: [
                "Please provide a math expression like '5*5+10'."
            ],
            playGame: [
                "Want to play a quick game? I can start a number guessing game! Interested?"
            ],
            confirmGame: [
                "Great! I'm thinking of a number between 1 and 10. What's your guess?"
            ],
            unknown: [
                "I'm sorry sir, I didn't quite understand that. Could you please rephrase?",
                "Pardon me sir, I'm not sure how to respond to that. May I assist you with something else?",
                "Apologies sir, I may have missed your meaning. Could you kindly try again?",
                "I'm afraid I didn't catch that, sir. Would you mind asking in a different way?",
                "Sorry sir, I couldn't process that request. I'm here to assist—please try again.",
                "That seems unclear to me, sir. Could you please clarify?",
                "I apologize sir, I’m still learning. Can you rephrase your request?",
                "I'm not sure I understand, sir. Let me know how I can better assist you."
            ]
        };

        // Audio player event listeners
        this.audioPlayerChat.addEventListener('ended', () => {
            if (this.isRepeat) {
                this.playSong(this.currentSongIndex);
            } else {
                this.playNextSong();
            }
        });

        this.audioPlayerChat.addEventListener('play', () => {
            this.playPauseBtnChat.textContent = "Pause";
        });

        this.audioPlayerChat.addEventListener('pause', () => {
            this.playPauseBtnChat.textContent = "Play";
        });

        document.getElementById('prev-btn-chat').addEventListener('click', () => this.playPreviousSong());
        document.getElementById('next-btn-chat').addEventListener('click', () => this.playNextSong());
        document.getElementById('play-pause-btn-chat').addEventListener('click', () => {
            if (this.audioPlayerChat.paused) {
                this.resumeSong();
            } else {
                this.pauseSong();
            }
        });
        document.getElementById('repeat-btn-chat').addEventListener('click', () => this.toggleRepeat());
    }

    async processInput(input) {
        const transcript = input.trim();
        const transcriptLower = transcript.toLowerCase();

        // If query starts with "friday," or "friday what"
        if (transcriptLower.startsWith("friday,")) {
            const question = transcript.replace(/^friday,/, "").trim();
            const aiResponse = await this.callAI(question);
            return {
                 text: this.markdownToHtml(aiResponse) 
            }
        }

        
        // Clear any existing context timeout
        if (this.contextTimeout) {
            clearTimeout(this.contextTimeout);
        }

        
        // Handle follow-up responses based on context
        if (this.context === 'whatsMyIp') {
            if (transcriptLower === 'yes' || transcriptLower === 'yep' || transcriptLower === 'sure' || transcriptLower === 'okay' || transcriptLower === 'ok') {
                this.context = null;
                this.contextAttempts = 0;
                return {
                    text: this.getRandomResponse('confirmYes'),
                    action: () => window.open('https://www.google.com/search?q=what%27s+my+ip', '_blank')
                };
            } else if (transcriptLower === 'no') {
                this.context = null;
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmNo');
            }
            this.context = null;
            this.contextAttempts = 0;
        } else if (this.context === 'setAlarm') {
            if (transcriptLower === 'yes' || transcriptLower === 'yep' || transcriptLower === 'sure' || transcriptLower === 'okay') {
                this.context = 'awaitingTimerDuration';
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmTimer');
            } else if (transcriptLower === 'no') {
                this.context = null;
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmNo');
            }
            this.context = null;
            this.contextAttempts = 0;
        } else if (this.context === 'awaitingTimerDuration') {
            // Allow variations like "5sec", "5 seconds", "5 min", etc.
            const timeMatch = transcriptLower.match(/(\d+)\s*(sec|seconds?|min|minutes?)/i);
            if (timeMatch) {
                const value = parseInt(timeMatch[1]);
                const unit = timeMatch[2].toLowerCase();
                let seconds = value;
                if (unit.startsWith('min')) {
                    seconds = value * 60;
                }
                this.context = null;
                this.contextAttempts = 0;
                this.setTimer(seconds);
                return this.getRandomResponse('timer').replace('{seconds}', seconds);
            }
            this.contextAttempts++;
            if (this.contextAttempts >= 2) {
                this.context = null;
                this.contextAttempts = 0;
                return "I didn't understand the timer duration. Let's try something else!";
            }
            return this.getRandomResponse('invalidTimer');
        } else if (this.context === 'openCalculator') {
            if (transcriptLower === 'yes' || transcriptLower === 'yep' || transcriptLower === 'sure' || transcriptLower === 'okay') {
                this.context = 'awaitingMathExpression';
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmMath');
            } else if (transcriptLower === 'no') {
                this.context = null;
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmNo');
            }
            this.context = null;
            this.contextAttempts = 0;
        } else if (this.context === 'awaitingMathExpression') {
            if (transcriptLower.match(/[\d+\-*/()]+/)) {
                const mathMatch = transcriptLower.match(/[\d+\-*/()]+/);
                this.context = null;
                this.contextAttempts = 0;
                return this.solveMath(mathMatch[0]);
            }
            this.contextAttempts++;
            if (this.contextAttempts >= 2) {
                this.context = null;
                this.contextAttempts = 0;
                return "I couldn't parse that math expression. Let's try something else!";
            }
            return "Please provide a valid math expression (e.g., '5*5+10'). Try again!";
       
        } else if (this.context === 'playGame') {
            if (transcriptLower === 'yes' || transcriptLower === 'yep' || transcriptLower === 'sure' || transcriptLower === 'okay') {
                this.context = 'playingGame';
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmGame');
            } else if (transcriptLower === 'no') {
                this.context = null;
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmNo');
            }
            this.context = null;
            this.contextAttempts = 0;
       
        } else if (this.context === 'playingGame') {
            const guess = parseInt(transcriptLower);
            if (!isNaN(guess) && guess >= 1 && guess <= 10) {
                this.context = null;
                this.contextAttempts = 0;
                const number = 7; // Fixed for simplicity
                if (guess === number) return "You got it! The number was 7!";
                return `Sorry, the number was 7. Want to play again?`;
            }
            this.contextAttempts++;
            if (this.contextAttempts >= 2) {
                this.context = null;
                this.contextAttempts = 0;
                return "Please guess a number between 1 and 10. Let's try something else!";
            }
            return "Please guess a number between 1 and 10. Try again!";
        }


        
        




        // Set context timeout for commands expecting follow-ups
        if (transcriptLower.includes("what's my ip") || transcriptLower.includes("whats my ip") ||
            transcriptLower.includes("set an alarm") || transcriptLower.includes("open calculator") ||
            transcriptLower.includes("i want to play game")) {
            this.contextTimeout = setTimeout(() => {
                this.context = null;
                this.contextAttempts = 0;
            }, 30000);
        }

        // Multi-search bar logic
        if (transcriptLower.startsWith('y,')) {
            const query = transcript.substring(2).trim();
            return {
                text: `Searching YouTube for "${query}"`,
                action: () => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank')
            };
        } else if (transcriptLower.startsWith('g,')) {
            const query = transcript.substring(2).trim();
            return {
                text: `Searching Google for "${query}"`,
                action: () => window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank')
            };
        }

        // Website opening commands
        const websiteCommands = {
            
            
    
  
            // AI Chatbots
            'claude': { url: 'https://claude.ai', responseKey: 'claude95' },
            'claude ai': { url: 'https://claude.ai', responseKey: 'claude95' },
            'perplexity': { url: 'https://www.perplexity.ai', responseKey: 'perplexity96' },
            'perplexity ai': { url: 'https://www.perplexity.ai', responseKey: 'perplexity96' },
            'meta ai': { url: 'https://www.meta.ai', responseKey: 'meta97' },
            'chatgpt': { url: 'https://chatgpt.com', responseKey: 'chatgpt98' },
            'chat gpt': { url: 'https://chatgpt.com', responseKey: 'chatgpt98' },
            'grok': { url: 'https://grok.com', responseKey: 'grok99' },
            'grok ai': { url: 'https://grok.com', responseKey: 'grok99' },
            'deepseek': { url: 'https://www.deepseek.com', responseKey: 'deepseek100' },
            'deepseek ai': { url: 'https://www.deepseek.com', responseKey: 'deepseek100' },
            'qwen': { url: 'https://chat.qwen.ai', responseKey: 'qwen101' },
            'qwen ai': { url: 'https://chat.qwen.ai', responseKey: 'qwen101' },
            'copilot': { url: 'https://copilot.microsoft.com', responseKey: 'copilot102' },
            'copilot ai': { url: 'https://copilot.microsoft.com', responseKey: 'copilot102' },
            'wikipedia': { url: 'https://www.wikipedia.org', responseKey: 'wikipedia103' },
            'remove bg': { url: 'https://www.remove.bg', responseKey: 'removeBg104' },





            //writing
            'grammarly': { url: 'https://www.grammarly.com', responseKey: 'grammarly105' },
            'grammarly ai': { url: 'https://www.grammarly.com', responseKey: 'grammarly105' },
            'duolingo': { url: 'https://www.duolingo.com', responseKey: 'duolingo106' },


        };

        for (const [key, config] of Object.entries(websiteCommands)) {
            if (transcriptLower.includes(`open ${key}`) || 
                transcriptLower.includes(`friday open ${key}`) || 
                transcriptLower.includes(`open ${key} friday`) || 
                 transcriptLower.includes(`o,${key}`) || 
                transcriptLower.includes(`friday ${key}`)) {
                return {
                    text: config.text || this.getRandomResponse(config.responseKey),
                    action: () => window.open(config.url, '_blank')
                };
            }
        }

        // Music Controls
        if (transcriptLower.includes("stop the song")) {
            return this.stopSong();
        } else if (transcriptLower.includes("play s a m song") ||transcriptLower.includes("friday play s a m song")||
        transcriptLower.includes("play s a m song friday") || transcriptLower.includes("play sam song") ||
        transcriptLower.includes("play sam song friday") || transcriptLower.includes("friday play sam song")||
        transcriptLower.includes("p-s a m")||transcriptLower.includes("p-sam")) {
            return this.playSongByTitle("Samajavaragamana");


        } else if (transcriptLower.includes("play d e p song")|| transcriptLower.includes("friday play d e p song")||
        transcriptLower.includes("play d e p song friday")||transcriptLower.includes("play dep song")||
        transcriptLower.includes("play dep song friday")||transcriptLower.includes("friday play dep song")||
        transcriptLower.includes("p-d e p")||transcriptLower.includes("p-dep")||
    //diw
    transcriptLower.includes("friday play d i w song")|| transcriptLower.includes("play d i w song")||
        transcriptLower.includes("play d i w song friday")||transcriptLower.includes("play diw song")||
        transcriptLower.includes("play diw song friday")||transcriptLower.includes("friday play diw song")||
        transcriptLower.includes("p-diw")||transcriptLower.includes("p-diw")) {
            return this.playSongByTitle("diwali song");

       
        } else if (transcriptLower.includes("play a song") || transcriptLower.includes("play music") || transcriptLower.includes("play song")||
            transcriptLower.includes("friday play a song") || transcriptLower.includes("friday play music") ||
            transcriptLower.includes("friday play song") || transcriptLower.includes("play a song friday") ||
            transcriptLower.includes("play music friday") || transcriptLower.includes("play song friday")||
        transcriptLower.includes("friday play song")) {
            return this.playSong(this.currentSongIndex);


            //for stoping the song
        } else if (transcriptLower.includes("pause") || transcriptLower.includes("pause song") || transcriptLower.includes("pause music") ||
        transcriptLower.includes("friday pause") || transcriptLower.includes("friday pause song") || transcriptLower.includes("friday pause music")||
        //uses "the" word in the comands
        transcriptLower.includes("friday pause the song")||transcriptLower.includes("friday pause the music")||
        //after comand friday
        transcriptLower.includes("pause friday") || transcriptLower.includes("pause song friday") || transcriptLower.includes("pause music friday")||
        transcriptLower.includes("pause the song friday")||transcriptLower.includes("pause the music friday")||
        transcriptLower.includes("stop the song friday")||transcriptLower.includes("friday stop the song")||
        transcriptLower.includes("stop the song")||transcriptLower.includes("stop song")||transcriptLower.includes("stop song friday")||
        transcriptLower.includes("friday stop song")) {
            return this.pauseSong();


            //for resuming the song
        } else if (transcriptLower.includes("resume") || transcriptLower.includes("resume song")||
        transcriptLower.includes("resume the song")||transcriptLower.includes(" friday resume") ||
        transcriptLower.includes("frday resume song")|| transcriptLower.includes("friday resume the song")||
        transcriptLower.includes("resume friday") ||transcriptLower.includes("resume song friday")||
        transcriptLower.includes("resume the song friday")||

        transcriptLower.includes("resume music") || transcriptLower.includes("resume the music")||
        transcriptLower.includes("friday resume music")|| transcriptLower.includes("resume music friday")||
        transcriptLower.includes("resume the music friday")){
            return this.resumeSong();

            //for play the next song
        } else if (transcriptLower.includes("next song") ||transcriptLower.includes("next song friday")|| transcriptLower.includes("friday next song")||
        transcriptLower.includes("play next song") ||transcriptLower.includes("play next song friday")||transcriptLower.includes("friday play next song")||
        transcriptLower.includes("play another song")||transcriptLower.includes("play another song friday") ||transcriptLower.includes("friday play another song")||
        transcriptLower.includes("another song")|| transcriptLower.includes("another song friday")||transcriptLower.includes("friday another song")||
        transcriptLower.includes("could you please play next song")|| transcriptLower.includes("could you please play next song friday")||transcriptLower.includes("friday could you please play next song")) {
            return this.playNextSong();

        //for play the previous song
        } else if (transcriptLower.includes("previous song")|| transcriptLower.includes("previous song friday")|| transcriptLower.includes("friday previous song")||
        transcriptLower.includes("play previous song") ||transcriptLower.includes("play previous song friday")||transcriptLower.includes("friday play previous song")||
        transcriptLower.includes("friday play the previous song") || transcriptLower.includes("friday play the previous song") ||
        transcriptLower.includes("before song") || transcriptLower.includes("before song friday") || transcriptLower.includes("friday before song")||
        transcriptLower.includes("play before song") || transcriptLower.includes("play before song friday") || transcriptLower.includes("friday play before song")){
            return this.playPreviousSong();

        //for repeat the song
        } else if (transcriptLower.includes("repeat song")|| transcriptLower.includes("repeat song friday")|| transcriptLower.includes("friday repeat song")||
        transcriptLower.includes("repeat the song") || transcriptLower.includes("repeat the song friday")|| transcriptLower.includes("friday repeat the song")||
        transcriptLower.includes("turn on repeat mode") || transcriptLower.includes("turn on repeat mode friday")|| transcriptLower.includes("friday turn on repeat mode")||
        transcriptLower.includes("turn on repeat") || transcriptLower.includes("turn on repeat friday")|| transcriptLower.includes("friday turn on repeat")||
        transcriptLower.includes("repeat mode on") || transcriptLower.includes("repeat mode on friday")|| transcriptLower.includes("friday repeat mode on")||
        transcriptLower.includes("repeat mode") || transcriptLower.includes("repeat mode friday")|| transcriptLower.includes("friday repeat mode")){
            return this.toggleRepeat();
        }

        // Greetings and other commands
        if (transcriptLower.includes('hi') || transcriptLower.includes('hi friday') || transcriptLower.includes("friday hi")) {
            return this.getRandomResponse('greetings$hi');

        } else if (transcriptLower.includes('hello') || transcriptLower.includes('hello friday') ||
        transcriptLower.includes("friday hello")) {
            return this.getRandomResponse('greetings$hello');

        } else if (transcriptLower.includes('how are you friday') || transcriptLower.includes('friday how are you')||
             transcriptLower.includes('how are you')){
                return this.getRandomResponse('greetings$howareyou')
             
        } else if (transcriptLower.includes('what are you doing') || transcriptLower.includes('friday what are you doing') || 
        transcriptLower.includes('what are you doing now') || transcriptLower.includes('friday what are you doing now') ||
        transcriptLower.includes("what are you doing now friday") || transcriptLower.includes("friday what are you doing now") ){
            return this.getRandomResponse('greetings$whatareyoudoing');
        } else if (transcriptLower.includes('who are you') || transcriptLower.includes('who are you tell me')||
                   transcriptLower.includes('tell me who are you')) {
            return this.getRandomResponse('greetings$whoareyou');
        }
        
        

        // Timer
        if (transcriptLower.includes('set a timer') ||
            transcriptLower.includes('friday set a timer') ){
            const timeMatch = transcriptLower.match(/set a timer for (\d+)\s*(seconds?|minutes?)/i) ||
             transcriptLower.match(/friday set a timer for (\d+)\s*(seconds?|minutes?)/i);
            if (timeMatch) {
                const value = parseInt(timeMatch[1]);
                const unit = timeMatch[2] ? timeMatch[2].toLowerCase() : 'seconds';
                let seconds = value;
                if (unit.startsWith('minute')) {
                    seconds = value * 60;
                }
                this.setTimer(seconds);
                return this.getRandomResponse('timer').replace('{seconds}', seconds);
            }
            return 'Please specify a number of seconds or minutes for the timer (e.g., "set a timer for 5 seconds" or "set a timer for 5 minutes")!';
        }

        // Time and Date
        if (transcriptLower === "time" || 
            transcriptLower.includes("tell me time") || transcriptLower.includes("whats the time now") || transcriptLower.includes("whats the time")||
            transcriptLower.includes('friday time') || transcriptLower.includes('friday tell me time'),
            transcriptLower.includes('friday whats the time now') || transcriptLower.includes('time friday') || transcriptLower.includes('tell me time friday')||
            transcriptLower.includes('whats the time now friday') ) {
            const time = this.tellTime();
            return this.getRandomResponse('time').replace('{time}', time);

        } else if (transcriptLower.includes("tell me today date") || transcriptLower.includes("today date") ||
        transcriptLower.includes("friday tell me today date") || transcriptLower.includes("friday today date")||
        transcriptLower.includes("tell me today date friday")|| transcriptLower.includes("today date friday")||
        transcriptLower.includes("what is today date friday") || transcriptLower.includes("friday what is today date")||
        transcriptLower.includes("what's today date friday") || transcriptLower.includes("friday what's today date")|| 
        transcriptLower.includes("what's today date") || transcriptLower.includes("friday whats today date")||
        transcriptLower.includes("whats today date friday") || transcriptLower.includes("friday date") || transcriptLower.includes("date friday")){
            const date = this.tellDate();
            return this.getRandomResponse('date').replace('{date}', date);
        }

        

        

        // Information Lookup
        if (transcriptLower.includes('who is') || transcriptLower.includes('what is') || 
            transcriptLower.includes('tell me about')|| transcriptLower.includes('friday who is') ||
            transcriptLower.includes('friday what is') || transcriptLower.includes('friday tell me about')) {
            const query = transcriptLower.replace(/who is|what is|tell me about|friday who is|friday what is|friday tell me about/gi, '').trim();
            return this.fetchWikipediaSummary(query);
        }

        // Math Calculations (skip if in timer or calculator context)
        if (!this.context && transcriptLower.match(/[\d+\-*/()]+/)) {
            const mathMatch = transcriptLower.match(/[\d+\-*/()]+/);
            if (mathMatch) {
                const expression = mathMatch[0];
                return this.solveMath(expression);
            }
            return "I couldn't parse that math expression. Please use numbers and operators like +, -, *, /, and parentheses.";
        }

        // Additional Commands
        if (transcriptLower.includes("tell me a joke") || transcriptLower.includes("say a joke")) {
            return this.getRandomResponse('joke');
        }


        //conversation facilities
        // Play a Game
        if (transcriptLower.includes("i want to play game")) {
            this.context = 'playGame';
            this.contextAttempts = 0;
            return this.getRandomResponse('playGame');
        }
        // What's my IP
        if (transcriptLower.includes("what's my ip") || transcriptLower.includes("whats my ip")) {
            this.context = 'whatsMyIp';
            this.contextAttempts = 0;
            return this.getRandomResponse('whatsMyIp');
        }
        // Set an Alarm
        if (transcriptLower.includes("set an alarm")) {
            this.context = 'setAlarm';
            this.contextAttempts = 0;
            return this.getRandomResponse('setAlarm');
        }

        // Open Calculator
        if (transcriptLower.includes("open calculator")) {
            this.context = 'openCalculator';
            this.contextAttempts = 0;
            return this.getRandomResponse('openCalculator');
        }
        return this.getRandomResponse('unknown');
    }
    
    getRandomResponse(responseType) {
        const responses = this.responses[responseType] || this.responses['unknown'];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    playSong(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentSongIndex = index;
            this.audioPlayerChat.src = this.playlist[this.currentSongIndex].url;
            this.audioPlayerChat.play();
            this.audioPlayerContainerChat.classList.add('active');
            this.songTitleChat.textContent = this.playlist[this.currentSongIndex].title;
            return `Playing "${this.playlist[this.currentSongIndex].title}"`;
        }
        return "No such song in my playlist!";
    }

    playSongByTitle(title) {
        const songIndex = this.playlist.findIndex(song => song.title.toLowerCase() === title.toLowerCase());
        if (songIndex !== -1) {
            this.currentSongIndex = songIndex;
            return this.playSong(songIndex);
        }
        return "Couldn't find that song!";
    }

    stopSong() {
        this.audioPlayerChat.pause();
        this.audioPlayerChat.currentTime = 0;
        this.audioPlayerContainerChat.classList.remove('active');
        return this.getRandomResponse('stopthesong');
    }

    pauseSong() {
        this.audioPlayerChat.pause();
        return "Paused the music.";
    }

    resumeSong() {
        this.audioPlayerChat.play();
        this.audioPlayerContainerChat.classList.add('active');
        return `Resuming "${this.playlist[this.currentSongIndex].title}"`;
    }

    playNextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
        return this.playSong(this.currentSongIndex);
    }

    playPreviousSong() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
        return this.playSong(this.currentSongIndex);
    }

    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        return this.isRepeat ? "Repeat mode activated!" : "Repeat mode turned off.";
    }

    tellTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    }

    tellDate() {
        const now = new Date();
        return now.toDateString();
    }

    setTimer(seconds) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        const endTime = Date.now() + seconds * 1000;
        this.updateTimerDisplay(seconds);

        this.timerInterval = setInterval(() => {
            const remainingTime = Math.round((endTime - Date.now()) / 1000);
            if (remainingTime <= 0) {
                clearInterval(this.timerInterval);
                this.timerDisplay.classList.remove('active');
                const response = this.getRandomResponse('timerDone').replace('{seconds}', seconds);
                typeMessage(response, 'bot-message');
            } else {
                this.updateTimerDisplay(remainingTime);
            }
        }, 1000);
        return `Timer set for ${seconds} seconds`;
    }

    updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        this.timerDisplay.textContent = `Timer: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        this.timerDisplay.classList.add('active');
    }

    fetchWikipediaSummary(query) {
        const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.extract) {
                    const link = `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`;
                    const summary = data.extract.length > 200 ? data.extract.substring(0, 200) + '...' : data.extract;
                    return `<div class="wikipedia-summary">${summary} <a href="${link}" target="_blank">Read more on Wikipedia</a></div>`;
                } else {
                    return "I couldn't find any information on that.";
                }
            })
            .catch(error => {
                console.error('Error fetching Wikipedia data:', error);
                return "Sorry, I couldn't fetch the information.";
            });
    }

    async callAI(userMessage) {
    try {
        const response = await fetch('https://openpagefriday-2-5pro.onrender.com/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: "user", content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        // ✅ Extract AI response correctly
        return data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
    } catch (error) {
        console.error('Error calling Render API:', error);
        return "Something went wrong. Please try again later.";
    }
}



markdownToHtml(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')             // Italic
        .replace(/`(.*?)`/g, '<code>$1</code>')           // Inline code
        .replace(/\n/g, '<br>');                          // Line breaks
}


    solveMath(expression) {
        try {
            const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');
            if (!sanitizedExpression) {
                return "Invalid math expression. Please use numbers, operators (+, -, *, /), and parentheses.";
            }

            const result = eval(sanitizedExpression);
            if (isNaN(result) || !isFinite(result)) {
                return "The result is not a valid number. Please check your expression.";
            }

            return `The result of ${expression} is ${result}.`;
        } catch (error) {
            return "Error evaluating the expression. Please ensure it's a valid math expression (e.g., '5*5*5+10+10/5').";
        }
    }
}



const chatbot = new FridayChatbot();
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');

function appendMessage(message, className) {
    if (!message.startsWith('y,') && !message.startsWith('g,')) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function typeMessage(message, className) {
    if (!message.startsWith('y,') && !message.startsWith('g,')) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        let i = 0;
        const speed = 20;
        function type() {
            if (i < message.length) {
                const currentText = message.substring(0, i + 1);
                messageDiv.innerHTML = currentText;
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
}

function handleInput() {
    const input = chatInput.value.trim();
    if (!input) return;

    appendMessage(input, 'user-message');
    const result = chatbot.processInput(input);

    // synchronous string result
    if (typeof result === 'string') {
        typeMessage(result, 'bot-message');
    } 
    // promise result (could resolve to string or object)
    else if (result instanceof Promise) {
        result.then(res => {
            if (res && typeof res === 'object' && res.text) {
                // render HTML directly
                const messageDiv = document.createElement('div');
                messageDiv.className = `message bot-message`;
                messageDiv.innerHTML = res.text;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                const typingDuration = res.text.replace(/<[^>]*>/g, '').length * 20 + 200;
                if (res.action) setTimeout(res.action, typingDuration);
            } else {
                typeMessage(res, 'bot-message');
            }
        });
    } 
    // object with text + optional action
    else if (typeof result === 'object' && result.text) {
        // render HTML directly (use innerHTML)
        const messageDiv = document.createElement('div');
        messageDiv.className = `message bot-message`;
        messageDiv.innerHTML = result.text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const typingDuration = result.text.replace(/<[^>]*>/g, '').length * 20 + 200;
        if (result.action) setTimeout(result.action, typingDuration);
    }

    chatInput.value = '';
}

function clearConversation() {
    chatMessages.innerHTML = '';
    chatbot.context = null;
    chatbot.contextAttempts = 0;
    if (chatbot.contextTimeout) {
        clearTimeout(chatbot.contextTimeout);
    }
}

sendBtn.addEventListener('click', handleInput);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInput();
});
clearBtn.addEventListener('click', clearConversation);



