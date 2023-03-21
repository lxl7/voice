$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();


    //1.给发送按钮绑定点击事件
    $('#btnSend').click(function () {

        // 获取输入框的内容
        const text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('');
        }
        // 如果用户输入了聊天内容，则将聊天内容追加到页面上去
        $('.talk_list').append(`
        <li class="right_word">
            <img src="img/person02.png" /> <span>${text}</span>
          </li>
        `);
        // 清空输入框
        $('#ipt').val('');
        // 让滚动条移动到最下面
        resetui();
        getMsg(text);

    });

    // 获取聊天机器人发送回来的数据
    function getMsg(text) {
        $.ajax({
            type: "GET",
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text,
            },

            success: function (res) {
                // console.log(res);
                if (res.message === 'success') {
                    const msg = res.data.info.text;
                    // console.log(msg);
                    $('.talk_list').append(`
                    <li class="left_word">
            <img src="img/person01.png" /> <span>${msg}</span>
          </li>
                    `);
                    // 让滚动条移动到最下面
                    resetui();
                    // ---------------------------------------------
                    // 将机器人的语言转为语音
                    getVoice(msg);
                }
            }
        })
    }

    // 将机器人的文字转为语音
    function getVoice(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text,
            },
            success: function (res) {
                console.log(res);
                if (res.status === 200) {
                    // 播放语言
                    document.querySelector('#voice').src = res.voiceUrl;
                    // $('#voice').attr('src',res.voiceUrl);
                }
            }
        })
    }

    // 回车发送消息
    // 为文本框绑定keyup事件
    $('#ipt').keyup(function (e) {
        if (e.keyCode === 13) {
            $('#btnSend').click();
        //     // 获取输入框的内容
        //     const text = $('#ipt').val().trim();
        //     if (text.length <= 0) {
        //         return $('#ipt').val('');
        //     }
        //     // 如果用户输入了聊天内容，则将聊天内容追加到页面上去
        //     $('.talk_list').append(`
        // <li class="right_word">
        //     <img src="img/person02.png" /> <span>${text}</span>
        //   </li>
        // `);
        //     // 清空输入框
        //     $('#ipt').val('');
        //     // 让滚动条移动到最下面
        //     resetui();
        //     getMsg(text);
        }
    })
})