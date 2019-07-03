import './pages/home/home.js';

// getElementById wrapper
function $id(id) {
    return document.getElementById(id);
}

// asyncrhonously fetch the html template partial from the file directory,
// then set its contents to the html of the parent element
function loadHTML(url, id) {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
        $id(id).innerHTML = req.responseText;
    };
}

// use #! to hash
const router = new Navigo(null, true, '#!');
router.on({
    // 'view' is the id of the div element inside which we render the HTML
    'home': () => {
        loadHTML('./pages/home/index.html', 'main');
    },
});

// set the default route
router.on(() => {
    $id('main').innerHTML = '<h2>Here by default</h2>';
});

router.navigate('/home');

// set the 404 route
router.notFound((query) => {
    $id('main').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>';
});

router.resolve();
