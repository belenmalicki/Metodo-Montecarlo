import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  MarkSeries,
  FlexibleXYPlot,
} from "react-vis";
import * as math from "mathjs";
import FunctionsModal from "./FunctionsModal";

export default function App() {
  const [funcion, setFuncion] = useState("e^x");
  const [a, setA] = useState(-5);
  const [b, setB] = useState(5);
  const [n, setN] = useState(500);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [carga, setCarga] = useState(new Date());

  const funcionMontecarlo = (funcion, a, b, n) => {
    var arrayPuntos = [];
    const parser = math.parser();
    parser.evaluate("f(x)=" + funcion);
    var xRandom = 0;
    var yRandom = 0;
    var yReal = 0;
    var puntosDisparados = 0;
    var puntosPositivos = 0;
    var puntosNegativos = 0;
    var h = (b - a) / n;
    var maximo = math.max(parser.evaluate("f(" + a + ")"), 0);
    var minimo = math.min(parser.evaluate("f(" + a + ")"), 0);
    for (var i = a + h; i <= b; i = i + h) {
      var aux = parser.evaluate("f(" + i + ")");
      if (maximo < aux) {
        maximo = math.max(aux, 0);
      }
      if (aux < minimo) {
        minimo = math.min(aux, 0);
      }
    }

    const maxValue = maximo;
    const minValue = minimo;
    while (puntosDisparados < n) {
      xRandom = math.random(a, b);
      yRandom = math.random(minValue, maxValue);
      yReal = parser.evaluate("f(" + xRandom + ")");
      if (yRandom >= 0) {
        if (yReal >= yRandom) {
          puntosPositivos++;
          arrayPuntos.push({ x: xRandom, y: yRandom, color: "#4eb764", size: 1 });
        } else {
          arrayPuntos.push({ x: xRandom, y: yRandom, color: "#E562C9", size: 1 });
        }
      } else {
        if (yReal > yRandom) {
          arrayPuntos.push({ x: xRandom, y: yRandom, color: "#E562C9", size: 1 });
        } else {
          puntosNegativos++;
          arrayPuntos.push({ x: xRandom, y: yRandom, color: "#eb7734", size: 1 });
        }
      }
      puntosDisparados++;
    }

    const resultado = 
      ((puntosPositivos - puntosNegativos) / puntosDisparados) *
      (b - a) *
      (maxValue - minValue);
    console.log(resultado);
    localStorage.setItem("resultado", resultado);
    return [arrayPuntos];
  };
  const graficarFuncion = (funcion, a, b) => {
    console.log(funcion);
    var arrayAux = [];
    const h = 0.01;
    const parser = math.parser();
    parser.evaluate("f(x)=" + funcion);
    for (var i = a; i <= b; i = i + h) {
      var aux = parser.evaluate("f(" + i + ")");
      arrayAux.push({ x: i, y: aux });
    }

    return arrayAux;
  };

  const onClick = () => {
    setFuncion(document.getElementById("tf-funcion").value);
    setA(parseFloat(document.getElementById("tf-a").value));
    setB(parseFloat(document.getElementById("tf-b").value));
    setN(parseFloat(document.getElementById("tf-n").value));
    setCarga(new Date());
  };
  function openModal() {
    setIsOpen(true);
  }

  return (
    <div style={{ width: window.innerWidth, height: window.innerHeight, backgroundColor: "#B0F2BE" }}>
      <p
        style={{
          fontSize: 25,
          backgroundColor: "#62e57e",
          padding: 20,
          color: '#fff',
          fontFamily: 'Montserrat',
          fontWeight: 'bold',
          margin: 0
        }}
        align="center"
      >
        MONTECARLO
      </p>
      <div container style={{ backgroundColor: "#B0F2BE", display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <div className={classes.paper}
          style={{
            marginBottom: 25,
            backgroundColor: '#B0F2BE',
          }}
          item xs={8}>
          <FlexibleXYPlot
            width={800}
            height={480}
            style={{
              backgroundColor: "#FFFFFF",
              position: "center",
              marginTop: 20,
            }}
            dontCheckIfEmpty={true}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries
              style={{
                strokeWidth: "1px",
                color: "black",
              }}
              opacity={0.4}
              lineStyle={{ stroke: "black" }}
              data={graficarFuncion('0', a, b)}
              size={2}
            />
            <LineSeries
              className="linemark-series-example"
              style={{
                strokeWidth: "2px",
                color: "black",
              }}
              lineStyle={{ stroke: "black" }}
              data={graficarFuncion(funcion, a, b)}
              size={2}
            />
            <MarkSeries
              className="mark-series-example"
              sizeRange={[1, 3]}
              strokeWidth={2}
              data={funcionMontecarlo(funcion, a, b, n)[0]}
              colorType="literal"
            />
          </FlexibleXYPlot>
        </div>
        <div>
          <div style={{ backgroundColor: "#fff", borderRadius: 10, height: 380, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '5%', marginLeft: '5%' }}>
            {/*glosario */}
            <label style={{ fontFamily: 'Montserrat' }}>
              Ingrese la función a graficar
              <button style={classes.question} onClick={openModal}> ?</button> :
              <FunctionsModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
              <input
                id="tf-funcion"
                style={classes.textField}
                //style={{ width: 350,display:'flex',flexDirection:'column', alignItems:'center' }}
                required
                defaultValue="e^x"
              />
            </label>
            <br />
            <label style={{ fontFamily: 'Montserrat' }}>
              Ingrese el valor de a:
              <input
                id="tf-a"
                style={classes.textField}
                //style={{ width: '100%' }}
                required
                defaultValue="-5"
              />
            </label>
            <br />
            <label style={{ fontFamily: 'Montserrat' }}>
              Ingrese el valor de b:
              <input
                id="tf-b"
                style={classes.textField}
                //style={{ width: '100%' }}
                required
                defaultValue="5"
              />
            </label>
            <br />
            <label style={{ fontFamily: 'Montserrat' }}>
              Ingrese el valor de N:
              <input
                id="tf-n"
                style={classes.textField}
                //style={{ width:'100%'}}
                required
                defaultValue="500"
              />
            </label>
            <br />
            <button
              style={classes.button}
              onClick={onClick}
            >
              Graficar
            </button>
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: 10, height: 80, width: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '5%', marginTop: '5%' }}>
            {localStorage.getItem("resultado") !== null && (
              <p className={classes.textFieldResultado} style={{ fontFamily: 'Montserrat' }} align="center">
                El resultado es: <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }} >{localStorage.getItem("resultado")}</p>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const classes = ({
  textField: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 350,
    borderRadius: 5,
    borderWidth: 0.5,
    height: 20,
    marginTop: 10,
    fontFamily: 'Montserrat'

  },
  textFieldResultado: {
    width: 250,
    marginTop: 50,
    fontSize: 18,
    color: 'red',
  },
  button: {
    marginTop: 10,
    color: "#FFF",
    backgroundColor: "#E562C9",
    width: 150,
    height: 40,
    borderRadius: 5,
    borderColor: "#E562C9",
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
  question: {
    color: "#FFF",
    backgroundColor: "#E562C9",
    width: 22,
    height: 22,
    borderRadius: 20,
    borderColor: "#E562C9",
    fontSize: 12,
    fontFamily: 'Montserrat'
  }
});

