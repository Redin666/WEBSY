AOS.init();


ymaps.ready(init);

function init() {
    // Создаем карту.
    var myMap = new ymaps.Map("map-show", {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ["zoomControl"], 
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Создаем круг.
    var myCircle = new ymaps.Circle([
            // Координаты центра круга.
            [55.76, 37.60],
            // Радиус круга в метрах.
            10000
        ], {}, {
            // Задаем опции круга.
            // Цвет заливки.
            fillColor: "#DB709377",
            // Цвет обводки.
            strokeColor: "#000000",
            // Прозрачность обводки.
            strokeWidth: 5
        });

    // Добавляем круг на карту.
    myMap.geoObjects.add(myCircle);

    // Включаем редактирование круга.
    myCircle.editor.startEditing();
}

function work(){
    alert('test');
    let x = document.getElementById('point');
    ymaps.geocode('Нижний новгород',{results:1}).then(function (res){
        var firstGeoObject = res.geoObjects.get(0),
            coords = firstGeoObject.geometry.getCoordinates(),
            Bounds = firstGeoObject.properties.get('boundedBy');
            firstGeoObject.options.set('preset','islands#darkBlueDoWithCaption');
            console.log('Все данные объекта: ', firstGeoObject.properties.getAll());
    })
}

