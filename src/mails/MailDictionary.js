export const mailDictionary = {

    //Storyline World Formula
    "Warning":{
        id: "Warning",
        title: "Warning",
        content: <>You are searching for it as well, aren't you? Please, stop before it is too late! The pursuit will rob you off your sleep, even once you know it is futile. For me it is too late to turn back, to give up. But I believe you can still be saved.</>,
        responses: [<>What are you talking about?</>, <>Who are you?</>],
        sender: "Y",
    },
    "What":{
        id: "What",
        title: "Re: What are you talking about?",
        content: <>I noticed how obsessed you were lately with researching formulas and large numbers, so I was sure you must have heard about it. About the mythical formula that is said to transcend maths itself. I've spent years following traces, not even sure why it is important or what my ultimate goal is. My curiousity led me deeper and deeper into the rabbit hole, but it was all in vain. Save yourself the trouble and stop digging deeper.</>,
        responses: [<>What did you find out so far?</>, <>Yeah, I'd rather not get involved in this.</>],
        sender: "Y",
    },
    "Who":{
        id: "Who",
        title: "Re: Who are you?",
        content: <>You may call me "Y". A few years ago, I first heard the rumors about <i>that</i> formula from a work colleague, and ever since I devoted my life to finding it. I remember that, back when I started, I was just like you, always on the look for more and more powerful formulas. But it's a slippery slope! For your sanity, I hope you can resist. But at the same time, I am wondering how far you could get if, just like me, you put all of your heart, and also your sanity, into this...</>,
        responses: [<>So what did all your research amount to?</>, <>I am nothing like you, you are creeping me out!</>],
        sender: "Y",
    },
    "Still":{
        id: "Still",
        title: "Still here?",
        content: <>I see you are still working on those formulas, despite my warnings. Maybe I'll share some of my most recent findings with you...</>,
        sender: "Y",
    },
    "Formula":{
        id: "Formula",
        title: "What I know",
        content: <>It is said there is a formula so powerful, that it can be used to alter the laws of reality. Some have dubbed it the "Origin Formula", others the "God Formula" but the name that resonates most with me is "World Formula". It seems that the World Formula is not something tangible: It's neither an object you can find, nor a formula you can just write down. Much rather, it appears to be a state of mind, some kind of enlightenment. A stream of conciousness that lets you unleash your full potential and ultimately allows you to go way beyond!</>,
        sender: "Y",
    },
    "How":{
        id: "How",
        title: "But how???",
        content: <>You may be wondering how to achieve such a state, how to <i>discover</i> the World Formula for yourself. One must break out of the prison imposed by ones formulas. Find unlimited growth. Yearn for <b>Infinity</b>. Yet one must not just invent new formulas, instead one must <b>exploit the core of mathematics</b> to break free of the bounds which constrain ones conciousness.</>,
        sender: "Y",
    },
    "Dangerous":{
        id: "Dangerous",
        title: "Be careful!",
        content: <>The World Formula can be very dangerous in the wrong hands! It can manifest all sorts of energies. If you ever happen to find it, I trust that you will make the right choice.</>,
        sender: "Y",
    },
    "After":{
        id: "After",
        title: "How is it going?",
        content: <>Hey, I haven't heard back from you in a while. How are you? How is your research going?</>,
        responses: [<>I found the World Formula</>, <>Not much going on lately</>],
        sender: "Y",
    },
    "Found":{
        id: "Found",
        title: "Re: I found the World Formula",
        content: <>Haha, you got me for a moment. You got to be kidding, there is no way you could just find it <i>that quickly</i> while I have put in years with nothing to show. But to be honest, you seem to be in a better place now, sorry for bothering you. Maybe it is finally the right time for me to give up and move on as well.</>,
        sender: "Y",
    },
    "Nothing":{
        id: "Nothing",
        title: "Re: Not much going on lately",
        content: <>Yeah I know that feeling. Sometimes it is best to just put your mind to something different. I'm also feeling my passion for the World Formula fading away slowly. I am happy that we could be a part of each other's journey!</>,
        sender: "Y",
    },

    
    //Storyline Homework
    "Homework":{
        id: "Homework",
        title: "Help with Homework",
        content: <>Hey, you are good with numbers aren't you? Can you help my sons with his maths homework?</>,
        responses: [<>Sure, maybe I can learn a thing too!</>, <>Sorry I have more important things to do.</>],
        sender: "Karen",
    },
    "Learn":{
        id: "Learn",
        title: "Re: Sure, maybe I can learn a thing too!",
        content: <>Exactly, the teacher learns more than the student! That's why you are going to pay me some Alpha Tokens for the privilege of helping my boys.</>,
        responses: [<>Deal!</>, <>Wait, what?</>],
        sender: "Karen",
    },
    "Important":{
        id: "Important",
        title: "Re: Sorry I have more important things to do!",
        content: <>Nothing is more important than my little boys! But well I'll let you farm some of those important Alpha Tokens for me while you are helping them.</>,
        responses: [<>Yes, ma'am!</>, <>Can I say no?</>],
        sender: "Karen",
    },
    "Refuse":{
        id: "Refuse",
        title: "Re: Can I say no?",
        content: <>No.</>,
        sender: "Karen",
    },
    "Klausi":{
        id: "Klausi",
        title: "Klausi's Homework",
        content: <>Hi I'm Klausi. My homework is about eights and zeroes or something. Here are the exercises for you: </>,
        exercises: [{question:<>8 + 0 = ?</>, answers:["0","8", "80", "NaN"], correct: 1},
        {question:<>8 - 0 = ?</>, answers:["0","8", "80", "NaN"], correct: 1},
        {question:<>8 * 0 = ?</>, answers:["0","8", "80", "NaN"], correct: 0},
        {question:<>8 / 0 = ?</>, answers:["0","8", "80", "NaN"], correct: 3},],
        sender: "Klausi",
    },
    "Henry":{
        id: "Henry",
        title: "Henry's Homework",
        content: <>Hi I'm Henry,  Klausi's older brother. My homework is about squares and negative numbers or something. Here are the exercises for you: </>,
        exercises: [{question:<>2 - 5 = ?</>, answers:["3","7", "-3", "-7"], correct: 2},
        {question:<>8<sup>2</sup> = ?</>, answers:["16","64", "-16", "-64"], correct: 1},
        {question:<b>(-8)<sup>2</sup> = ?</b>, answers:["16","64", "-16", "-64"], correct: 1},
        {question:<b>2 - (-5)<sup>2</sup> = ?</b>, answers:["3","7", "-3", "-7"], correct: 1},],
        sender: "Henry",
    },
    "Powerful":{
        id: "Powerful",
        title: "I love Squaring now",
        content: <>Hi this is Henry again, thanks to you I learned that squaring a number is very powerful, the square increases really fast when the number increases. From now on I will use the square whenever I want to make big numbers!!! </>,
        sender: "Henry",
    },
    "Tommy":{
        id: "Tommy",
        title: "Tommy's Homework",
        content: <>Hi I'm Tommy, Henry's older brother. My homework is about logarithms or something. Here are the exercises for you: </>,
        exercises: [{question:<>log<sub>2</sub>(4) = ?</>, answers:["2","-2", "1", "NaN"], correct: 0},
                    {question:<>log<sub>2</sub>(-4) = ?</>, answers:["2","-2", "1", "NaN"], correct: 3},
                    {question:<b>log<sub>2</sub>(1/4) = ?</b>, answers:["2","-2", "1", "NaN"], correct: 1},
                    {question:<>log<sub>2</sub>(0) = ?</>, answers:["2","-2", "1", "NaN"], correct: 3},],
        sender: "Tommy",
    },
    "Jimmy":{
        id: "Jimmy",
        title: "Jimmy's Homework",
        content: <>Hi I'm Jimmy, Tommy's older stepbrother. My homework is about logarithms or something. Here are the exercises for you: </>,
        exercises: [{question:<>log<sub>2</sub>(4) = ?</>, answers:["2","-2", "1", "NaN"], correct: 0},
                    {question:<>log<sub>2</sub>(-4) = ?</>, answers:["2","-2", "1", "NaN"], correct: 3},
                    {question:<b>log<sub>2</sub>(1/4) = ?</b>, answers:["2","-2", "1", "NaN"], correct: 1},
                    {question:<>log<sub>2</sub>(0) = ?</>, answers:["2","-2", "1", "NaN"], correct: 3},],
        sender: "Jimmy",
    },
    "Gary":{
        id: "Gary",
        title: "Gary's Homework",
        content: <>Hi I'm Gary, the oldest brother. My homework is about square roots and infinities or something. Here are the exercises for you: </>,
        exercises: [{question:<>sqrt(-9) = ?</>, answers:["3","-3", "3i", "Infinity"], correct: 2},
                    {question:<b>sqrt(Infinity) = ?</b>, answers:["3","-3", "3i", "Infinity"], correct: 3},
                    {question:<b>log<sub>2</sub>(Infinity) = ?</b>, answers:["0","Infinity", "-Infinity", "NaN"], correct: 1},
                    {question:<>Infinity - Infinity = ?</>, answers:["0","Infinity", "-Infinity", "NaN"], correct: 3},],
        sender: "Gary",
    },
    "Thx":{
        id: "Thx",
        title: "Thx",
        content: <>Thx for the help. But my sons still failed class because you just gave the answers instead of teaching them properly. So <i>you</i> were the only one who profited from this.</>,
        responses: [<>So how exactly did I profit?</>, <>I did not profit, I was just trying to help</>],
        sender: "Karen",
    },
    "Profit":{
        id: "Profit",
        title: "Your Profit",
        content: <>Well now you know that <b>logarithms of fractions can produce negative results</b>, those negative numbers can become <b>positive by squaring</b> them, <b>subtracting negative numbers</b> makes things bigger, and that square roots and logarithms <b>go towards Infinity</b> if you put in bigger and bigger numbers. Seems like a lot to me.</>,
        responses: [<>I knew that before!</>, <>Thx, I guess?!?</>, <>Oooh, that might actually help me.</>],
        sender: "Karen",
    },
    "Children":{
        id: "Children",
        title: "Get out of my mails",
        content: <>Yeah, good for you. Now stop abusing me and my children for your stupid research. Stop wasting my time and instead <b>find that powerful formula</b> or whatever you were looking for!</>,
        sender: "Karen",
    },

    //Storyline: Academy
    "Welcome":{
        id: "Welcome",
        title: "Welcome to the Academy",
        content: <>Due to your outstanding research in the field of x differentials and formulas, the Academy decided to support you on your journey as one of our members. You should already have received your very first Alpha Token. Your Alpha Tokens can be traded with us for various upgrades. You can obtain additional Alpha Tokens by getting the three differentials and then performing an Alpha Reset. If you manage to Alpha Reset with a very high x, we will award you with multiple Alpha Tokens at once!</>,
        sender: "Academy",
    },
    "Research":{
        id: "Research",
        title: "Research",
        content: <>As a part of our Academy, you may now use our institutions for Research. You find Research on the Alpha tab. For Research it is important to not do your x-Resets immediately, but instead aim for a better highscore. The speed of your research is directly proportional to your highscores. If a highscore gets very much ahead of a Research level, you can even claim multiple levels at once! Research may not seem to help much when you first start, but its benefits grow exponentially, and they will soon speed up your daily work greatly.</>,
        sender: "Academy",
    },
    "Challenges":{
        id: "Challenges",
        title: "Academy Projects",
        content: <>We are very happy with the results of your Research so far. As such we would like to invite you to participate in more complex projects. Sometimes true wisdom can only be achieved by restricting ones options, forcing one to assume new perspectives. On the Alpha tab you can find our projects under Challenges. Every Challenge and Challenge segment you clear will allow us to make your formulas more efficient. And once you have proven yourself, there will be special rewards if you can help with the toughest Challenges our Academy faces right now.</>,
        sender: "Academy",
    },
    "Stones":{
        id: "Stones",
        title: "Stones",
        content: <>I heard you found a rare stone? I do not know what it is and what to do with it. But you can find your stones on the Alpha tab. Feel free to experiment with them, though I am not sure if they will turn out to be useful for anything.</>,
        sender: "Academy",
    },
    "Maxxed":{
        id: "Maxxed",
        title: "Maxxed Research",
        content: <>The Academy impressed with your Research. For every field of research that you fully complete, we will double your Formula Efficiency. Keep up the good work!</>,
        sender: "Academy",
    },
    "Idle":{
        id: "Idle",
        title: "Master of Idle",
        content: <>Congratulations on finishing the Master of Idle Challenge. We improved your Passive Alpha gain, from now on you will get Alpha based on your best fully idle Alpha run. You can check it on the Alpha upgrades tab.</>,
        sender: "Academy",
    },
    "God":{
        id: "God",
        title: "Formula God",
        content: <>Thank you for attempting the Formula God Challenge. That one is truly giving us nightmares. However, we are able to support you by boosting your Research speed proportional to your best scores in the Formula God Challenge. You can check this special boost on the Research tab. Keep trying and improving!</>,
        sender: "Academy",
    },
    "MaxStones":{
        id: "MaxStones",
        title: "Maximum Stone Power",
        content: <>Congratulations! You got all Starting Stones and managed to max out their bonus to your starting x. As to what the point of that is, we are not sure, but we will sure try to find out. Or maybe you will figure it out before we do, let's see.</>,
        sender: "Academy",
        responses: [<>I could use some help.</>, <>I don't need your help.</>],
    },
    "Hint":{
        id: "Hint",
        title: "Re: I could use some help.",
        content: <>We'll do our best. It may take some time though.</>,
        sender: "Academy",
    },
    "TrueHint":{
        id: "TrueHint",
        title: "We have an idea for those Stones.",
        content: <>Sorry for taking so long, we went down the wrong path for a while: Your starting x now allows you to get the three differentials without using any formulas. But that does not really seem to help you do anything new. Then, upon closer inspection we noticed that with your Starting X it should now be possible to use x''' &#10141; x''' + log<sub>2</sub>(x)<sup>2</sup> as your first formula. Curiously, if one was to apply that formula while x=Infinity, then one could also reach x'''=Infinity.</>,
        sender: "Academy",
    },

    //Sidestory: Prince
    "Prince":{
        id: "Prince",
        title: "Your Prince",
        content: <>Hello, I am rich prince. Inheritance is good! I can make x very big. But need money for that. Give me. You be make happy then!</>,
        responses: [<>How can I give you?</>, <>No</>],
        sender: "Prince",
    },
    "Transfer":{ //Transfer minigame
        id: "Transfer",
        title: "Re: How can I give you?",
        content: <>Transfer money. 200$! But must not be suspicious. Must transfer only one dollar at a time!</>,
        responses: [<>Transfer a dollar</>, <>No way, this is a scam</>],
        sender: "Prince",
    },
    "Failed":{
        id: "Failed",
        title: "You bad person",
        content: <>You not helped me! Now prince cannot feed family. We poor. Why you no heart? See picture of them!</>,
        responses: [<>Open Attachment: familypicture.exe</>],
        sender: "Prince",
    },
    "Virus":{
        id: "Virus",
        title: "YOU FOOL",
        content: <>Haha! You open my Virus! Now no x production for next 20 minutes! Now you got rekt!</>,
        sender: "Prince",
    },
    "Sent":{
        id: "Sent",
        title: "Thank you",
        content: <>Now prince can feed family. We poor. You have big heart. Attachment will double your x! But can only use once!</>,
        responses: [<>Open Attachment: xdoubler.exe</>],
        sender: "Prince",
    },
    "Rich":{
        id: "Rich",
        title: "Thank you so much!!!",
        content: <>Not only did you help me to feed my family, I was even able to hire someone to fix my bad grammar and wording for this email! It really means a lot to us, and we send you much love! Sadly, I cannot properly repay you, but the attachment can triple the value of your x. It can only be used once though, so be careful. Best regards, the prince and his family.</>,
        responses: [<>Open Attachment: xtripler.exe</>],
        sender: "Prince",
    },

    //Sidestory: Market Research
    "Survey":{ //Star Survey Minigame
        id: "Survey",
        title: "Survey",
        content: <>Hi, I hope you are enjoying this game! Please take a moment and rate your experience on a scale of 0 to 5 stars.</>,
        sender: "Dev"
    },
    "Submitted":{
        id: "Submitted",
        title: "Your feedback has been submitted!",
        content: <>Your submission has been received. Thank you for your feedback. If you are interested, I can inform you about the results of the survey.</>,
        responses: [<>Yes, please!</>, <>No, thank you!</>],
        sender: "Dev"
    },
    "Results":{ //Make result vary by User Input
        id: "Results",
        title: "Survey Results",
        content: <>Here are the latest results of the survey: There were a total of 28 submissions, with an average rating of 6.7 out of 5 stars. Thank you for your participation.</>,
        sender: "Dev"
    },

    //Sidestory: x-Mail
    "Prime":{ //Make result vary by User Input
        id: "Prime",
        title: "x-Mail Prime",
        content: <>Hello! Thank you for using x-Mail as your eMail client. To get the most out of your experience with x-Mail, upgrade now to an x-Mail Prime Membership!</>,
        responses: [<>What's included in the membership?</>, <>Stop annoying me with these stupid ads</>],
        sender: "x-Mail"
    },

    "Advantages":{
        id: "Advantages",
        title: "x-Mail Prime Advantages",
        content: <>Hello again! x-Mail Prime includes unlimited access to: x-Books, our extensive e-Book library; x-Music, the only place where you can find the Idle Formulas Official Soundtrack; x-Games, our quadruple A gaming portal and x-Videos, our streaming service with only the best movies.</>,
        responses: [<>I think I'll pass</>],
        sender: "x-Mail"
    },

    "Premium":{
        id: "Premium",
        title: "Re: Stop annoying me with these stupid ads",
        content: <>Hello again! If you are annoyed by our ads, you will be happy to hear that you can use x-Mail free of advertisements starting today, by upgrading to our new x-Mail Premium plan.</>,
        responses: [<>Ugh</>],
        sender: "x-Mail"
    },
}

const worldformula = ["Warning", "What", "Who", "Still", "Formula", "How", "Dangerous", "After", "Found", "Nothing"]
const academy = ["Welcome", "Research", "Challenges", "Stones", "Maxxed", "Idle", "God", "MaxStones", "Hint", "TrueHint"]
const homework = ["Homework", "Learn", "Important", "Refuse", "Klausi", "Henry", "Powerful", "Tommy", "Jimmy", "Gary", "Thx", "Profit", "Children"]

const prince = ["Prince", "Transfer", "Failed", "Virus", "Sent", "Rich"]
const marketresearch = ["Survey", "Submitted", "Results"]
const xmail = ["Prime", "Advantages", "Premium"]

export const mailList = Array.prototype.concat.apply([], [worldformula, academy, homework, prince, marketresearch, xmail])