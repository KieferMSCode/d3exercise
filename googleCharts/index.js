//Vamos a definir nuestro objeto histograma con el formato deseado por google charts, definiendo la información de cada campo con los datos que hemos trabajado en el ejemplo de D3 js y pasándoselas mediante id al container que lo va a mostrar en nuestro html con el campo element, así como el ancho y alto de la gráfica con los campos pertinentes en el campo options
const histo = {
    chart: null,
    data: [
        ['nombre', 'edad'],
        ['Carlos', 46],
        ['Ana', 32],
        ['Pepa', 78],
        ['JoseLuis', 17],
        ['Jacinto', 24],
        ['Amanda', 30]
    ],
    element: '#histo',
    options: {
        title: 'Edades del grupo',
        width: 500,
        height: 300,
        colors: ['#1e2e3b'],
        bar: { gap: 0 },
        hAxis: {
            ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        //Las animaciones son bastante sencillas con esta librería
        animation: {
            startup: true,
            duration: 1000,
            easing: 'out'
        }
    }
};

//Vamos a definir una función para selecionar y dibujar nuestra gráfica
const init = () => {
    histo.chart = new google.visualization.BarChart(
        document.querySelector(histo.element)
    );
    //Inicializamos el objeto de tipo histograma y le pasamos la referencia de nuestra gráfica
    histo.chart.draw(
        google.visualization.arrayToDataTable(histo.data),
        histo.options
    );
    //Dibujamos el histograma con el método draw pasándole los datos de nuestro objeto así como las especificaciones de su forma, titulo, color, etc.
};

//Aunque desde el index hayamos introducido el loader en una etiqueta script con una petición ajax, correremos estos comandos para cargar google charts en nuestro proyecto 
google.charts.load('current', {
    packages: ['corechart'],
    callback: init
})