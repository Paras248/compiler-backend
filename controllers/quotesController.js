const quotes = [
    'Programmer: A machine that turns coffee into code',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Computers are fast; programmers keep it slow',
    'Programs must be written for people to read, and only incidentally for machines to execute.',
    'When I wrote this code, only God and I understood what I did. Now only God knows',
    "I'm not a great programmer; I'm just a good programmer with great habits",
    'A son asked his father (a programmer) why the sun rises in the east, and sets in the west. His response? It works, don’t touch!',
    'Truth can only be found in one place: the code',
    'How many programmers does it take to change a light bulb? None, that’s a hardware problem',
    'Give a man a program, frustrate him for a day.Teach a man to program, frustrate him for a lifetime',
    'Programming can be fun, and so can cryptography; however, they should not be combined',
    'Copy-and-Paste was programmed by programmers for programmers actually',
    "How you look at it is pretty much how you'll see it",
    'Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live',
    'The most important property of a program is whether it accomplishes the intention of its user',
    'Algorithm: Word used by programmers when they don’t want to explain what they did',
    'First, solve the problem. Then, write the code',
    'Software and cathedrals are much the same - first we build them, then we pray',
    'Experience is the name everyone gives to their mistakes',
    'There are two ways to write error-free programs; only the third works',
    'Java is to JavaScript what car is to Carpet',
    'Code is like humor. When you have to explain it, it’s bad',
    'If debugging is the process of removing bugs, then programming must be the process of putting them in',
    'Remember that there is no code faster than no code',
    'Fix the cause, not the symptom',
    'One man’s crappy software is another man’s full-time job',
    'No code has zero defects',
    'Before software can be reusable it first has to be usable',
    'A good programmer is someone who always looks both ways before crossing a one-way street',
    'Don’t worry if it doesn’t work right. If everything did, you’d be out of a job',
    'It’s not a bug — it’s an undocumented feature',
    'Make it work, make it right, make it fast',
    'It works on my machine',
    'It compiles; ship it',
    'In a room full of top software designers, if two agree on the same thing, that’s a majority',
    'C makes it easy to shoot yourself in the foot; C++ makes it harder, but when you do, it blows your whole leg off.',
    'C programmers never die. They are just cast into void',
    'In C we had to code our own bugs. In C++ we can inherit them',
];

const getQuotes = (req, res, next) => {
    res.status(200).json({
        success: true,
        quote: quotes[Math.floor(Math.random() * 39)],
    });
};

module.exports = {
    getQuotes,
};
