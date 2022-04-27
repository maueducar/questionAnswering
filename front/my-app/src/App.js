import logo from './logo.svg';
import './App.css';
import ComboModels from './ComboModels'
import { useState } from 'react';

function App() {

  const [resultado, setResutado] = useState(null);
  const [new_, setNew] = useState(null);
  const [isLoaded,setIsLoaded] = useState(true);
  const [error,setError] = useState(null);

  const answerQuestion = () =>{
    //debugger;
    var response = null;
    var body = {
      Model: document.getElementById("selectModel").value,
      Url: document.getElementById("urlNew").value,
      Question: document.getElementById("question").value
    };

    setIsLoaded(false);

    fetch("/api/v1.0/question/",
    {
      method:"post",
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      } 
    })
      .then(res => res.json())
      .then(
        (result) => {
          setResutado(result.response.answer);  
          setError(false);
          setIsLoaded(true);
          setNew(result.new.toString().replace("[","").replace("]","").replace("\"",""));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    const fecha = new Date().toString();
    setTimeout(() => {
      setResutado(response);  
    }, 0);
    
  }


  return (
    <div className="App">
      <div class="App-header">
        <h1>Question Answering</h1>
      </div> 
      <div class="content">
          {/* <div id="ComboModels" data-commentid="1"></div> */}
        <ComboModels class="model">          
        </ComboModels>
        <div >
          <input class="model" type="text" id="urlNew" /> 
        </div>
        <p>
          <label class="questionTitle" for="question">Pregunta:</label><br></br>
          <input class="model question" type="text" id="question" name="question"/>
        </p>        
        <p>
          <button onClick={answerQuestion}>Responder</button>
        </p>
        <div class="response">
        {error && <div>Error: {error.message}</div>}
        {!isLoaded && !resultado  && <div class="loader">Is Loading...</div>}
        {isLoaded && <div id="Response"><h2>{resultado}</h2></div>}
        </div>        
        { isLoaded && <div class="new" dangerouslySetInnerHTML={{__html: new_}}></div>}
      </div> 

    </div>
  );
}

export default App;
