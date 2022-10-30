'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const input = document.querySelector("input[type='text']"),
          ul = document.querySelector("ul.main__list"),
          li = document.querySelectorAll(".list__item"),
          btn = document.querySelector(".main__button"),
          btnNote = document.querySelector(".true"),
          noteText = document.querySelector("textarea"),
          sectionNotes = document.querySelector(".notes"),
          notes = [];

    let activeList;

    for (let i = 0; i < li.length; i++) {
        notes[i] = '';
    }


// Information tasks
    function userInfo() {
        const li = document.querySelectorAll(".list__item"),
              done = document.querySelector('.done_text'),
              important = document.querySelector('.important_text'),
              total = document.querySelector('.total_text');

        let countDone = 0,
            importantDone = 0;

        li.forEach(list => {
            if(list.classList.contains('list__item_checked')){
                countDone++;
            }

            if(list.classList.contains('list__item_important')){
                importantDone++;
            }
        });
        

        done.textContent = `Done ${countDone}`;
        important.textContent = `Important ${importantDone}`;
        total.textContent = `Total ${li.length}`;
        
    }

// Create Task

    function createTask() {
        if(!!input.value) {            
            const li = document.createElement("li"),
                check = document.createElement("div"),
                taskText = document.createElement("span"),
                important = document.createElement("img"),
                trash = document.createElement("img");
            
            li.classList.add("list__item");
                
            check.classList.add('check');

            taskText.classList.add('text');
            taskText.textContent = input.value;

            important.src = 'icons/important.png';
            important.classList.add("important");
            
            trash.src = 'icons/delete.png';
            trash.classList.add("delete");
            ul.appendChild(li).append(check, taskText, important, trash);
            input.value = '';
            input.placeholder = "Добавить задание";

            notes.push('');
            
            userInfo();
        }
    }



// Button create task

    btn.addEventListener('click', createTask);


// Create task keyboard

    input.addEventListener("keydown", (keyPressed) => {
        if (keyPressed.which == 13) {
            createTask();
            userInfo();
        }
    });


    ul.addEventListener("click", event => {
        const li = document.querySelectorAll(".list__item");

    // Delete task

        if (event.target.classList.contains("delete")) {
            li.forEach((item, i) => {
                if(item === event.target.parentElement) {
                    item.remove();
                    notes.splice(i, 1);
                }
            });

            for (let i = 0; i < ul.childNodes.length; i++) {
                if(ul.childNodes[i].nodeName === 'TEXTAREA')
                {
                    ul.childNodes[i].remove();
                }
            }
        }
    
    // Checked task

        if (event.target.classList.contains("check") || event.target.tagName === "SPAN") {
            const parent = event.target.parentNode;
            parent.firstElementChild.classList.toggle('check_checked');
            parent.classList.toggle('list__item_checked');
            parent.childNodes[1].classList.toggle('text_checked');
            parent.classList.remove('list__item_important');

            if(parent.childNodes[2].classList.contains('important')) {
                parent.childNodes[2].remove();
            }else {
                const important = document.createElement('img');
                important.src = 'icons/important.png';
                important.classList.add("important");
                parent.lastElementChild.insertAdjacentElement('beforeBegin', important);
            }
        }

    // Select important task
        
        if (event.target.classList.contains("important")) {
            event.target.parentNode.classList.toggle('list__item_important');
            
            if(event.target.parentNode.classList.contains('list__item_important')) {
                event.target.src = 'icons/important_gray.png';
            }else {
                event.target.src = 'icons/important.png';
            }
        }

    // Focus task
        if (event.target.tagName === "LI") {
            li.forEach((item, i) => {
                if(item === event.target) {
                    // noteText.value = notes[i];
                    activeList = i;
                }else {
                    item.classList.remove('list__item_focus');
                }
            });

            event.target.classList.toggle('list__item_focus');


            if(document.documentElement.clientWidth < 426) {
                console.log('123');
                if(event.target.classList.contains('list__item_focus')) {
                    // if(ul.lastElementChild.classList.contains('text-click')){
                    //     document.querySelector('.text-click').remove();
                    // }else {
                    //     document.querySelector('.area').remove();
                    // }
                    for (let i = 0; i < ul.childNodes.length; i++) {
                        if(ul.childNodes[i].nodeName === 'TEXTAREA')
                        {
                            ul.childNodes[i].remove();
                        }
                    }
                    const textArea = document.createElement('textarea');
                    textArea.cols = '30';
                    textArea.rows = '10';
                    textArea.placeholder = 'Напишите заметку для данного задания';
                    textArea.value = notes[activeList];
                    console.log(activeList);
                    textArea.classList.add('area');
                    //ul.appendChild(textArea);
                    for (let i = 0; i < ul.childNodes.length; i++) {
                        if(ul.childNodes[i].nodeName === '#text')
                        {
                            ul.childNodes[i].remove();
                        }
                    }


                    console.log(ul.childNodes);
                    ul.childNodes[activeList].insertAdjacentElement('afterend', textArea);
                    textArea.addEventListener("keypress", () => {
                            notes[activeList] = textArea.value + " ";
                            console.log(notes);
                    });
    
    
                textArea.focus();
    
                }else {
                    // document.querySelector('.area').remove();
                    for (let i = 0; i < ul.childNodes.length; i++) {
                        if(ul.childNodes[i].nodeName === 'TEXTAREA')
                        {
                            ul.childNodes[i].remove();
                        }
                    }
                    // const textClick = document.createElement('textarea');
                    // textClick.classList.add('text-click');
                    // textClick.value = 'Нажмите на задания для создания заметки';
                    // textClick.readOnly = true;
                    // sectionNotes.appendChild(textClick);
    
                }
            }else {
                if(event.target.classList.contains('list__item_focus')) {
                    if(sectionNotes.lastElementChild.classList.contains('text-click')){
                        document.querySelector('.text-click').remove();
                    }else {
                        document.querySelector('.area').remove();
                    }
                    const textArea = document.createElement('textarea');
                    textArea.cols = '30';
                    textArea.rows = '10';
                    textArea.placeholder = 'Напишите заметку для данного задания';
                    textArea.value = notes[activeList];
                    console.log(activeList);
                    textArea.classList.add('area');
                    sectionNotes.appendChild(textArea);
                    textArea.addEventListener("keypress", () => {
                            notes[activeList] = textArea.value;
                            console.log(notes);
                    });
    
    
                textArea.focus();
    
                }else {
                    document.querySelector('.area').remove();
                    const textClick = document.createElement('textarea');
                    textClick.classList.add('text-click');
                    textClick.value = 'Нажмите на задания для создания заметки';
                    textClick.readOnly = true;
                    sectionNotes.appendChild(textClick);
    
                }
    
    
            }
        }
            

        

        userInfo();
    });

    userInfo();

    // btnNote.addEventListener('click', () => {
    //     notes[activeList] = document.querySelector('textarea').value;
    //     console.log(notes);
    // });

    // document.querySelector('textarea').addEventListener("keypress", (keyPressed) => {
    //     if (keyPressed.which == 13) {
    //         // notes[activeList] = noteText.value;
    //         notes[activeList] = document.querySelector('textarea').value;
    //         console.log(notes);
    //     }
    // });



});

const funds = [
    {amount: -1400},
    {amount: 2400},
    {amount: -1000},
    {amount: 500},
    {amount: 10400},
    {amount: -11400}
];

const getPositiveIncomeAmount = (data) => {

    const arrPositive = data.filter(money => money.amount > 0).map(item => item = item.amount);
    return arrPositive.reduce((sum, money) => sum + money);
};

const getTotalIncomeAmount = (data) => {

};

console.log(getTotalIncomeAmount(funds));

getPositiveIncomeAmount(funds);