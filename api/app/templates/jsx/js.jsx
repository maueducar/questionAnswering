'use strict';

class ComboModels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null,
      isLoaded: false,
      items: [] 
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/v1.0/models/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
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
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <select name="select" id="selectModel">
            {items.map(item => (
              <option value={item.Model}>{item.Description}</option>              
            ))}
          </select>
      );
    }
  }
}

ReactDOM.render(<ComboModels/>,document.getElementById("ComboModels"));


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null,
      isLoaded: false,
      items: [],
      body: {} 
    };
  }

  componentDidMount() {

    var body = {
      Model: document.getElementById("selectModel").value,
      Url: document.getElementById("urlNew").value,
      Question: document.getElementById("question").value
    };

    fetch("http://localhost:5000/api/v1.0/question/",
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
          this.setState({
            isLoaded: true,
            items: result
          });
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
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <h2 name="select">
            
            {items}              
            
          </h2>
      );
    }
  }
}

function answerQuestion(){
  document.getElementById("answer").innerHTML="";
  ReactDOM.render(<Question/>,document.getElementById("answer"));
}