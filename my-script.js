function init() {
    console.log("Hello, Practical 2"); // You can delete this.
    const player = document.getElementById('player-name')
    player.innerText = getUrlParam("name")


}

let current = 0; // 定义初始化题目序号

// 定义一个变量存答对题目的数目
let rightAnswer = 0;


function getQuestion() {
    const question = document.getElementById('question')
    const choiceA = document.getElementById('choice-A')
    const choiceB = document.getElementById('choice-B')
    const choiceC = document.getElementById('choice-C')
    question.innerText = questions[current]["question"]
    choiceA.innerText = questions[current]["choiceA"]
    choiceB.innerText = questions[current]["choiceB"]
    choiceC.innerText = questions[current]["choiceC"]



}

const questionStr = document.getElementById('quiz-title')
questionStr.innerText = "Question 1"
    // 获取next按钮
const nextBtn = document.getElementById('nextBtn')
    // 定义next函数，放置event参数，目的是为了换题目里面的内容
function next(event) {

    // 获取用户答案选择的答案getSelection("choices")
    if (getSelection("choices") === questions[current]["answer"]) {
        rightAnswer++;

    }
    current = current + 1; //每次加1获取下一道题目




    // 判断变量少于问题道数，可以继续执行getQuestion函数，否则就是考完了，要隐藏next按钮
    if (current < questions.length) {
        questionStr.innerText = "Question " + (current + 1)
        getQuestion();
        // 为了清空上一道题选择过的选项，所以需要调用clearSelection("choices")
        clearSelection("choices")
    } else {
        // event.target 这里是获取了这个按钮，然后给他隐藏了
        event.target.style.display = 'none';
        //当结束题目的时候调用计算最后的分数
        showResults();
    }

}

// 添加event listen去触发next函数
nextBtn.addEventListener("click", next)




// 显示答案的函数
function showResults() {
    let score = rightAnswer / questions.length;
    const results = document.getElementById('results');
    const quiz = document.getElementById("quiz")
        // 计算最后的结果然后把问卷隐藏了，显示最后的分数
    quiz.style.display = "none";
    results.style.display = "block"
        // 判断分数的标准，小于0.3 ，大于0.3小于0.75 ，大于0.75 ，因为js中的变量和字符串连接，需要用加号连接
    if (score < 0.3) {
        score = (score * 100).toFixed(1); //tofixed是保留一位小数，为什么要先乘以100,因为js里面的数目相除，存在精度缺失，详情百度一下，不好说明
        results.innerText = "Bad luck. Your final score was " + score + "%" + "(" + rightAnswer + "/" + questions.length + ")."
    } else if (0.1 <= score && score <= 0.75) {
        score = (score * 100).toFixed(1);
        results.innerText = "Not bad. Your final score was " + score + "%" + "(" + rightAnswer + "/" + questions.length + ")."

    } else if (score > 0.75) {
        score = (score * 100).toFixed(1);
        results.innerText = "Impressive. Your final score was " + score + "%" + "(" + rightAnswer + "/" + questions.length + ")."

    }
}


init();
getQuestion();