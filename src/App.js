import React, {Component} from 'react';
import './App.css';

class Nav extends Component {

  state = {
    list: []
  }

  componentDidMount(){
    fetch('list.json').then(function(result){
      return result.json();
    }).then(function(json){
      console.log(json);
      this.setState({list:json})
    }.bind(this))
  }

  render(){
    var listTag = [];
    for (var i = 0; i < this.state.list.length; i++){
      var li = this.state.list[i];
      listTag.push(<li key={li.id}><a href={li.id}>{li.title}</a></li>)
    }
    return (
      <nav>
        <ul>
          <li><a href="1">HTML</a></li>
          <li><a href="2">CSS</a></li>
          <li><a href="3">JS</a></li>
        </ul>
      </nav>
    )
  }
}

function App() {
  return (
    <div className="App">
      <h1 className="header">WEB</h1>

      <Nav></Nav>

      <article className="article">
        <h2>Welcome, React &amp; Ajax</h2>
      </article>
    </div>
  );
}

export default App;
