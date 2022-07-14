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
      this.setState({list:json})
    }.bind(this))
  }

  render(){
    var listTag = [];
    for (var i = 0; i < this.state.list.length; i++){
      var li = this.state.list[i];
      listTag.push(
      <li key={li.id}>
        <a href={li.id} data-id={li.id} onClick={ (e) => {
          e.preventDefault();
          console.log('Trigger');
          this.props.onClick(e.target.dataset.id);
        }}>
          {li.title}
        </a>
      </li>)
    }

    return (
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
    )
  }
}

class Article extends Component {
  render(){
    return (
      <article className="article">
        <h2>{this.props.title}</h2>
        <p>{this.props.desc}</p>
      </article>
    )
  }
}

 class App extends Component {
  state = {
    article: {title: 'Welcome', desc: 'Hello, React & Ajax'}
  }
  render(){
    return (
      <div className="App">
        <h1 className="header">WEB</h1>

        <Nav onClick={ (id) => {
          fetch(id+'.json')
          .then(function(result){
            return result.json();
          }).then(function(json){
            this.setState({
              article: {
                title: json.title,
                desc: json.desc
              }
            })
          }.bind(this))
          console.log(id);
        }}></Nav>
        <Article title={this.state.article.title} desc={this.state.article.desc}></Article>

      </div>
    );
  }
}

export default App;
