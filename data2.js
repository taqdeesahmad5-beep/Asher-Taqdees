/* ============================================================
   data2.js  =  the small things you will edit most (new pages)
   ============================================================ */
window.SITE2 = {

  /* ---- Featured Work (3 small cards on the Home page) ---- */
  featured: [
    { id: "zSOR06Ds8AE", label: "Debt Report" },
    { id: "fk06Xk8ddnE", label: "Water Crisis" },
    { id: "hZS-gwV_JRE", label: "Robotic Library" }
  ],

  /* ---- Story Map pins ----
     To add a report later: paste its YouTube link in url: "..." for that place.
     Leave url as "" and the pin shows "Report coming soon".
     (x, y, dx, dy, a only place the pin and its label on the map. Don't change them.) */
  pins: [
    { name: "Chakwal",      x: 366, y: 236, url: "https://www.youtube.com/watch?v=Fh7cazsWWIg&t=2s", dx: -12, dy: 4,  a: "end" },
    { name: "Bhakkar",      x: 317, y: 269, url: "", dx: -12, dy: 4,  a: "end" },
    { name: "Lahore",       x: 378, y: 276, url: "", dx: 12,  dy: 8,  a: "start" },
    { name: "Muridke",      x: 380, y: 260, url: "", dx: 12,  dy: -6, a: "start" },
    { name: "Changa Manga", x: 355, y: 293, url: "", dx: -12, dy: 12, a: "end" },
    { name: "Muzaffarabad", x: 382, y: 194, url: "https://www.youtube.com/watch?v=do_LEcZHSkY", dx: 12, dy: 4, a: "start" },
    { name: "Swat",         x: 349, y: 177, url: "", dx: -12, dy: 4,  a: "end" }
  ],


  /* ---- Quiz questions ----
     Each play picks 10 random questions you haven't seen yet, so every round is different.
     To add your own, copy one line and change it:
     ["Question?", ["Option A", "Option B", "Option C", "Option D"], 1, "Short explanation"]
     The number after the options is the correct one (0 = first option, 1 = second, 2 = third, 3 = fourth). */
  quiz: [
    ["In journalism, what is the “lede” (or lead) of a story?", ["The last sentence", "The photo caption", "The opening paragraph with the key facts", "The reporter’s name line"], 2, "The lede opens the story with its most important facts."],
    ["Which is NOT one of the classic five Ws of news?", ["Who", "Where", "Why", "Whether"], 3, "The five Ws are Who, What, When, Where and Why."],
    ["What is a “byline”?", ["A story’s last paragraph", "The line naming the reporter who wrote the story", "A press pass", "A type of headline"], 1, "The byline credits the writer."],
    ["What does “off the record” mean?", ["A correction", "A live broadcast", "Information not to be published or attributed", "A recorded interview"], 2, "Off the record means the source does not want it published."],
    ["The press is often called the “Fourth ___”.", ["Power", "Estate", "Wall", "Pillar"], 1, "“The Fourth Estate” refers to the press."],
    ["In news, what is a “scoop”?", ["A newspaper section", "An ice-cream flavour", "An exclusive story a reporter gets first", "A very long report"], 2, "A scoop is a story you get before anyone else."],
    ["What is “B-roll” in TV news?", ["The main interview", "A camera model", "The opening music", "Extra footage shown over the narration"], 3, "B-roll is the supporting video that covers the story."],
    ["What is “clickbait”?", ["A press release", "A headline designed to grab clicks, often misleading", "A news agency", "A fishing tool"], 1, "Clickbait trades accuracy for clicks."],
    ["What do TV anchors often read their script from?", ["A projector", "A scanner", "A teleprompter", "A radar"], 2, "A teleprompter scrolls the script in front of the camera lens."],
    ["Asher Taqdees reports for which news channel?", ["BBC", "Al Jazeera", "CNN", "ARY News"], 3, "Asher is a multimedia journalist at ARY News."],
    ["In which city is Asher Taqdees based?", ["Quetta", "Lahore", "Karachi", "Peshawar"], 1, "Asher is based in Lahore."],
    ["Which sport has Asher Taqdees competed in?", ["Archery", "Golf", "Chess", "Boxing"], 3, "Asher is an ex-boxer, so he knows a thing or two about punching up."],
    ["Which Pakistani drama starred Mahira Khan and Fawad Khan and aired on Hum TV in 2011?", ["Mere Paas Tum Ho", "Shehr-e-Zaat", "Humsafar", "Dastaan"], 2, "Humsafar became one of Pakistan’s most loved serials."],
    ["Which actor played Zaroon in Zindagi Gulzar Hai?", ["Humayun Saeed", "Danish Taimoor", "Fawad Khan", "Feroze Khan"], 2, "Fawad Khan starred opposite Sanam Saeed."],
    ["Which channel aired the hit drama Mere Paas Tum Ho (2019)?", ["PTV Home", "Geo Entertainment", "Hum TV", "ARY Digital"], 3, "Mere Paas Tum Ho aired on ARY Digital."],
    ["Which drama starred Iqra Aziz and Farhan Saeed and aired on ARY Digital in 2018?", ["Suno Chanda", "Humsafar", "Tere Bin", "Parizaad"], 0, "Suno Chanda was a major ARY Digital romantic comedy."],
    ["Which 2022 drama paired Yumna Zaidi and Wahaj Ali on Geo Entertainment?", ["Tere Bin", "Suno Chanda", "Parizaad", "Ehd-e-Wafa"], 0, "Tere Bin became a huge hit."],
    ["The Urdu-dubbed Ertugrul Ghazi aired in Pakistan on which channel?", ["Dunya", "PTV Home", "Geo News", "ARY News"], 1, "PTV Home aired the Urdu version in 2020."],
    ["Which song by Ali Sethi and Shae Gill from Coke Studio went global?", ["Chal Diye", "Pasoori", "Aaj Ki Raat", "Tera Woh Pyar"], 1, "Pasoori topped charts worldwide."],
    ["Who starred as Maula Jatt in the 2022 film The Legend of Maula Jatt?", ["Ali Zafar", "Shaan Shahid", "Hamza Ali Abbasi", "Fawad Khan"], 3, "Fawad Khan took the lead role, with Hamza Ali Abbasi as Noori Natt."],
    ["Which dialogue from Mere Paas Tum Ho went viral?", ["“Do takay ki aurat”", "“Sab theek hai”", "“Khuda hafiz”", "“Aap ki Nazron ne”"], 0, "The line took over social media."],
    ["Who captained Pakistan to the 1992 Cricket World Cup win?", ["Wasim Akram", "Imran Khan", "Inzamam-ul-Haq", "Javed Miandad"], 1, "Imran Khan lifted the trophy at the MCG."],
    ["Which captain led Pakistan to the 2009 T20 World Cup title?", ["Salman Butt", "Shahid Afridi", "Misbah-ul-Haq", "Younis Khan"], 3, "Younis Khan captained Pakistan to the title in England."],
    ["Arshad Nadeem won Olympic gold in 2024 in which event?", ["Hockey", "Javelin throw", "Wrestling", "Shot put"], 1, "He threw 92.97 m in Paris."],
    ["How many times has Pakistan won the Hockey World Cup?", ["2", "4", "1", "6"], 1, "Pakistan won in 1971, 1978, 1982 and 1994."],
    ["Which cricketer is nicknamed “Boom Boom”?", ["Rashid Latif", "Babar Azam", "Wasim Akram", "Shahid Afridi"], 3, "Shahid Afridi is famous for big hitting."],
    ["Muhammad Ali was known by which nickname?", ["The Greatest", "Iron Mike", "Money", "The Hitman"], 0, "Ali called himself The Greatest."],
    ["The “Rumble in the Jungle” between Ali and Foreman was held in which country?", ["Zaire (now DR Congo)", "Nigeria", "Brazil", "Jamaica"], 0, "It took place in Kinshasa in 1974."],
    ["What is Mike Tyson’s famous nickname?", ["Sugar", "Smokin’ Joe", "The Real Deal", "Iron Mike"], 3, "Iron Mike became the youngest heavyweight champion."],
    ["How many rounds is a standard men’s world title boxing fight?", ["8", "12", "10", "15"], 1, "Modern world title fights are scheduled for 12 rounds."],
    ["What is Pakistan’s national sport?", ["Kabaddi", "Cricket", "Squash", "Field hockey"], 3, "Hockey is the official national sport; cricket is the most popular."],
    ["Which mountain is the second highest in the world?", ["K2", "Lhotse", "Makalu", "Nanga Parbat"], 0, "K2 stands at about 8,611 m in the Karakoram range."],
    ["Which is the longest river flowing through Pakistan?", ["Chenab", "Ravi", "Indus", "Jhelum"], 2, "The Indus runs the length of the country."],
    ["The Minar-e-Pakistan stands in which city?", ["Karachi", "Multan", "Lahore", "Islamabad"], 2, "It commemorates the Pakistan Resolution of 1940."],
    ["The Badshahi Mosque in Lahore was built by which Mughal emperor?", ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"], 2, "Aurangzeb completed it in the 1670s."],
    ["Which garden is a UNESCO site alongside Lahore Fort?", ["Jinnah Garden", "Lawrence Garden", "Shalimar Gardens", "Race Course Park"], 2, "Both were inscribed in 1981."],
    ["Mohenjo-daro, an ancient Indus Valley city, is in which province?", ["Sindh", "Khyber Pakhtunkhwa", "Punjab", "Balochistan"], 0, "It lies in Larkana district, Sindh."],
    ["Which is Pakistan’s national flower?", ["Tulip", "Rose", "Marigold", "Jasmine"], 3, "Jasmine is the national flower."],
    ["Which animal is Pakistan’s national animal?", ["Markhor", "Snow leopard", "Indus dolphin", "Camel"], 0, "The markhor is the national animal."],
    ["Where is the Faisal Mosque?", ["Islamabad", "Karachi", "Peshawar", "Lahore"], 0, "It sits at the foot of the Margalla Hills."],
    ["Fairy Meadows is a famous viewpoint of which peak?", ["Nanga Parbat", "Tirich Mir", "K2", "Rakaposhi"], 0, "Fairy Meadows faces Nanga Parbat."],
    ["Hunza Valley is in which region?", ["Balochistan", "Punjab", "Gilgit-Baltistan", "Sindh"], 2, "Hunza is in Gilgit-Baltistan."],
    ["The Khewra Salt Mine is in which province?", ["Balochistan", "Khyber Pakhtunkhwa", "Punjab", "Sindh"], 2, "It is in Jhelum district, Punjab."],
    ["Which dam is Pakistan’s largest by volume?", ["Warsak", "Diamer-Bhasha", "Tarbela", "Mangla"], 2, "Tarbela on the Indus is one of the world’s largest earth-filled dams."],
    ["The Pakistan Resolution was passed in 1940 in which city?", ["Lahore", "Karachi", "Dhaka", "Delhi"], 0, "It was passed at Minto Park, Lahore."],
    ["Where is the Mazar-e-Quaid (Jinnah’s mausoleum)?", ["Islamabad", "Lahore", "Murree", "Karachi"], 3, "It stands in Karachi."],
    ["Which sea lies to Pakistan’s south?", ["Arabian Sea", "Red Sea", "Caspian Sea", "Black Sea"], 0, "Pakistan’s coast is on the Arabian Sea."],
    ["Which planet is known as the Red Planet?", ["Mercury", "Mars", "Jupiter", "Venus"], 1, "Iron oxide on the surface gives Mars its colour."],
    ["Which is the largest ocean on Earth?", ["Pacific", "Atlantic", "Indian", "Arctic"], 0, "The Pacific covers about a third of the planet."],
    ["Which is the largest planet in our solar system?", ["Jupiter", "Neptune", "Saturn", "Earth"], 0, "Jupiter is more than 11 times wider than Earth."],
    ["What is the chemical symbol for gold?", ["Gd", "Go", "Ag", "Au"], 3, "Au comes from the Latin aurum."],
    ["Which animal is the fastest on land?", ["Lion", "Horse", "Leopard", "Cheetah"], 3, "A cheetah can reach about 100 km/h in short bursts."],
    ["How many bones are in an adult human body?", ["256", "206", "306", "196"], 1, "Adults have 206 bones."],
    ["Which is the tallest building in the world?", ["Taipei 101", "Merdeka 118", "Shanghai Tower", "Burj Khalifa"], 3, "Burj Khalifa in Dubai is about 828 m tall."],
    ["Which animal is called the “Ship of the Desert”?", ["Horse", "Donkey", "Ostrich", "Camel"], 3, "Camels cross deserts carrying people and loads."],
    ["What is the capital of Japan?", ["Kyoto", "Seoul", "Osaka", "Tokyo"], 3, "Tokyo is Japan’s capital."],
    ["Complete the sentence: “___ going to win this match.”", ["There", "Their", "Thier", "They’re"], 3, "They’re = they are."],
    ["Which word is spelled correctly?", ["Accommodation", "Acomodation", "Acommodation", "Accomodation"], 0, "Two c’s and two m’s."],
    ["Choose the correct sentence.", ["She doesn’t like tea.", "She don’t like tea.", "She doesn’t likes tea.", "She not like tea."], 0, "With she/he/it we use doesn’t plus the base verb."],
    ["What is the plural of “crisis”?", ["Crisises", "Crisis’s", "Crises", "Crisi"], 2, "Crisis → crises."],
    ["What does the idiom “once in a blue moon” mean?", ["Very rarely", "Every month", "Every night", "Never"], 0, "It means something happens very rarely."],
    ["What does “break the ice” mean?", ["Go skating", "Ease the tension and start talking", "Break something", "Start an argument"], 1, "It means to ease the awkwardness of a first meeting."],
    ["What is the past tense of “catch”?", ["Cought", "Catch", "Caught", "Catched"], 2, "Catch → caught."],
    ["Which word is the opposite of “ancient”?", ["Antique", "Modern", "Old", "Historic"], 1, "Modern is the opposite of ancient."],
    ["Which sentence is correct?", ["Its’ raining today.", "Its raining today.", "It raining today.", "It’s raining today."], 3, "It’s = it is."]
  ],

  /* ---- Reports filter tabs ----
     Videos are sorted into tabs automatically from their titles.
     If one lands in the wrong tab, force it here:
     "VIDEO_ID": "investigations" | "general" | "explainers" | "promotions" */
  cats: {
    "YxPlcyfCnXg": "explainers",
    "SZu2KrBUZ4c": "explainers",
    "wQBU1x1roho": "explainers",
    "zfOhBSYLSHs": "explainers",
    "x6LlzweNpRY": "explainers",
    "8bYknFcSNQM": "explainers"
  },

  /* words in a title that decide the tab (lower case) */
  words: {
    investigations: ["drugs", "7553", "debt", "cheap ai", "ai tools", "basant", "boring water", "mafia", "scam", "investigat", "revelation"],
    explainers: ["explain", "why is", "why do", "why are", "what is", "how does"],
    promotions: ["launch", "campaign", "promo", "sponsor", "activation", "unveil", "brand"]
  }
};
