function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function render(element) {
    let code = shuffle([1, 2, 3, 4]);
    code.length = 3;
    element.textContent = code.join('.');
}

function initApp() {
    const element = document.querySelector('#code');
    render(element);

    element.addEventListener('click', _ => {
        if (confirm('Новый код?')) {
            render(element);
        }
    })
    preventLeave();
}

function initList() {
    const words = getDictionary();
    //words.sort((a,b) => b.length - a.length)
    //const shuffledWords = words;
    const shuffledWords = shuffle(words);
    shuffledWords.length = 4;
    document.body.innerHTML = `<ol class=list><li>${shuffledWords.join('</li><li>')}</li></ol>`;
    preventLeave();
}

function getDictionary() {
    const dictionary = `Ав­стра­лия ав­то­мат агент адво­кат Азия акт аль­бом Аль­пы Аме­ри­ка ам­фи­бия ан­гел Ан­глия Ан­тарк­ти­да ап­па­рат Ат­лан­ти­да Аф­ри­ка ац­тек ба­боч­ка ба­за Бай­кал банк ба­ня бар ба­рьер бас­сейн ба­та­рея баш­ня бе­рё­за Бер­лин Бер­му­ды би­лет бир­жа блин блок бо­е­вик бокс бо­лезнь боль­ни­ца бом­ба бо­ров борт бо­ти­нок боч­ка брак брев­но бу­ма­га бу­тыл­ка бык ва­гон вал ведь­ма век ве­нец вер­то­лёт верфь вес ве­тер взгляд вид вил­ка ви­рус во­да во­до­лаз вождь воз­дух вой­на вол­на вор вре­мя вы­со­та газ га­лоп гвоздь ге­ний Гер­ма­ния ги­гант глаз Гол­ли­вуд го­ло­ва гор­ло горн гра­нат гре­бень Гре­ция гриф гру­ша да­ма де­крет день дес­на ди­но­завр диск док­тор дра­кон дробь ду­ма дух ды­ра дя­тел Ев­ро­па Еги­пет еди­но­рог ёрш жизнь жи­ла жук жу­равль за­лог за­мок за­но­за за­пад за­пах за­яц звез­да зеб­ра зем­ля знак зо­ло­то зо­на зуб иг­ла иг­ра ик­ра Ин­дия ин­сти­тут ка­бинет ка­ва­лер кадр ка­зи­но ка­мень ка­ме­ра ка­нал ка­ра­ул кар­лик кар­та ка­ша кен­гу­ру кен­тавр кет­чуп ки­ви кисть кит Ки­тай клет­ка ключ ко­кет­ка кол ко­ло­да ко­лон­на коль­цо ко­ман­да ко­нёк кон­тра­бан­дист кон­церт ко­ра ко­рабль ко­роле­ва ко­роль ко­ро­на ко­са кость ко­сяк кош­ка край кран крест кро­лик крош­ка круг кры­ло ку­лак курс лад ла­зер ла­ма лас­ка лев лёд лей­ка лес ли­му­зин ли­ния ли­па лист ли­цо ло­же Лон­дон ло­шадь лук лу­на луч мас­ло мас­са мат ма­ши­на мёд мед­ведь Мек­си­ка ме­лочь ме­сто ме­ха­низм мик­ро­скоп мил­ли­о­нер мир мор­ковь мо­ро­же­ное Москва мост мо­тив муш­ка мышь на­лёт на­ряд небо­скрёб нин­дзя нож но­мер нор­ка но­та ночь Нью-Йорк ня­ня об­ласть об­лом об­раз об­ра­зо­ва­ние об­рез ов­сян­ка огонь Олимп опе­ра опе­ра­ция ор­ган орёл ось­ми­ног отель па­де­ние па­ла­та па­лец па­лоч­ка па­нель па­ра па­ра­шют парк пар­тия пас­саж па­ук пач­ка Пе­кин пе­ре­вод пе­ре­ме­на пе­ро пер­чат­ка пи­лот пинг­вин пи­ра­ми­да пи­рат пи­сто­лет пла­та пла­тье пло­щадь пляж по­бег по­вар под­ко­ва подъ­ём по­кров пол по­ле по­лис по­ли­ция по­мёт по­ро­да по­соль­ство по­ток поч­ка по­яс пра­во пред­ло­же­ние пред­при­ни­ма­тель при­бор при­вод при­зрак прин­цес­са при­ше­лец проб­ка про­вод­ник про­ка­за про­кат про­спект про­филь путь Пуш­кин раз­вод раз­во­рот рак ра­ко­ви­на рас­твор рейд Рим ро­бот рог род рок ру­баш­ка ру­кав ру­лет­ка ры­ба рысь ры­царь са­лют сан­тех­ник Са­турн свет сви­де­тель сек­рет сек­ция серд­це сеть си­ла скат смерть сна­ряд снег сне­го­вик со­ба­ка со­вет сол­дат соль со­став спут­ник сре­да ссыл­ка ста­ди­он стан ста­нок ствол стек­ло сте­на стой­ка стол сто­па стре­ла строй стру­на стул сту­пень судь­ба су­пер­ге­рой так­са та­нец та­рел­ка те­атр те­ле­скоп те­че­ние ти­тан То­кио точ­ка тра­ва тре­уголь­ник тру­ба ту­ба тур удар­ник удел узел урал ур­на ут­ка ут­ко­нос учё­ный учи­тель фа­кел фа­лан­га фига флей­та фо­кус фор­ма Фран­ция хвост хло­пок центр цер­ковь ча­сти­ца червь шар шо­ко­лад шпа­гат шпи­он штат шу­ба экран эльф эфир Юпи­тер яб­ло­ко яд язык якорь яс­ли`
    const pureDict = dictionary.replace(/\u00AD/g, '');// remove &shy; from text
    return pureDict.split(' ');
}

function preventLeave() {
  window.addEventListener('beforeunload', e => {
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = '';
  });
}
