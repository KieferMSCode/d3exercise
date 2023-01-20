//Para la representación de datos en este ejercicio vamos a trabajar con unos datos inventados
const datos = [
    { nombre: 'Carlos', edad: 46 },
    { nombre: 'Ana', edad: 32 },
    { nombre: 'Pepa', edad: 78 },
    { nombre: 'JoseLuis', edad: 17 },
    { nombre: 'Jacinto', edad: 24 },
    { nombre: 'Amanda', edad: 30 }
];

//Voy a definir las constantes de márgenes, alto y ancho de la representación
const width = 800;
const height = 400;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

//Creamos el SVG en el container de nuestro index con id = d3-container y sobre el construiremos nuestra gráfica
const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr('viewBox', [0, 0, width, height]);

//Vamos a crear una escala para los ejes x e y de nuestra gráfica, asignándoles un dominio (los datos inventados) y un rango (el rango que abarcan dichos datos, en este caso supondremos que las edades se comprenden entre 1 y 100) así como dotar la escala de un padding para una mejor visibilidad  
const x = d3.scaleBand()
    .domain(d3.range(datos.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([1, 100])
    .range([height - margin.bottom, margin.top]);

//Vamos a crear las barras de nuestra gráfica utilizando los métodos de nuestra librería
svg.append('g')
    //Creamos un grupo de svg shapes en un elemento 'g'
    .attr('fill', '#1e2e3b')
    //Coloreamos las barras
    .selectAll('rect')
    //Seleccionamos todos los rectángulos (barras)
    .data(datos.sort((a, b) => d3.descending(a.edad, b.edad)))
    //Le pasamos los datos ordenándolos de paso en orden descendiente
    .join('rect')
    //Definimos los atributos de nuestras barras
    .attr('x', (d, i) => x(i))
    //Con d (datos) e i (index) le decimos que nos las coloque en orden izq-der
    .attr('y', (d) => y(d.edad))
    //Le decimos que utilice la edad de nuestro muestreo para la altura
    .attr('height', d => y(0) - y(d.edad))
    //Establecemos el rango de ordenadas entre 0 y la edad máxima del muestreo
    .attr('width', x.bandwidth())
    //Utilizamos el método bandwidth para determinar el ancho de la gráfica
    .attr('class', 'rect');
//Le añadimos la clase rect para darle una interactividad mediante una etiqueta style desde nuestro index

//Con esto tenemos las barras de nuestro histograma pero necesitaremos crear la visualización de los ejes X e Y para entender mejor la información
function ejeX(g) {
    g.attr('transform', `translate(0, ${height - margin.bottom})`)
        //Primero hacemos transform translate para mover el eje y verlo debajo de las barras y no arriba como ocurriría por defecto
        .call(d3.axisBottom(x).tickFormat(i => datos[i].nombre))
        //Le indicamos que debe mostrarnos el nombre en las X
        .attr('font-size', '20px')
    //Le ponemos un tamaño de fuente más grande para verlo mejor
}

function ejeY(g) {
    g.attr('transform', `translate(${margin.left}, 0)`)
        //Primero hacemos otro translate para visualizar el eje a la izquierda
        .call(d3.axisLeft(y).ticks(null, datos.format))
        //Le pasamos los datos del eje y así como el formato de nuestro format specifier string para que determine la correcta precisión de la escala basándose en el intervalo entre ticks del eje, en este caso múltiplos de 10
        .attr('font-size', '20px')
    //Aumentamos una vez más la fuente para mejor visibilidad
}

//Dibujamos el eje X e Y llamándo a nuestras funciones
svg.append('g').call(ejeX);
svg.append('g').call(ejeY);

//Con el método node dibujamos nuestra gráfica en el SVG
svg.node();