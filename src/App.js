import React, {Component} from 'react';
import './App.css';

class Nav extends Component {

  render(){
    var listTag = [];
    for (var i = 0; i < this.props.list.length; i++){
      var li = this.props.list[i];
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

class NowLoading extends Component {
  render(){
    return (
      <div>Loading...</div>
    )
  }
}

 class App extends Component {
  state = {
    article: {
      item: {title: 'Welcome', desc: 'Hello, React & Ajax'},
      isLoading: false
    },
    list: {
      items: [],
      isLoading: false
    }
  }
  componentDidMount(){
    var newList = Object.assign({}, this.state.list, {isLoading:true}); //clone
    this.setState({list: newList})
    fetch('list.json').then(function(result){
      return result.json();
    }).then(function(json){
      this.setState({list:{
        items:json,
        isLoading: false
      }})
    }.bind(this))
  }
  render(){
    var NavTag = null;
    if(this.state.list.isLoading){
      NavTag = <NowLoading></NowLoading>
    }
    else {
      NavTag = 
      <Nav list={this.state.list.items} onClick={ (id) => {
        var newArticle = Object.assign({}, this.state.article, {isLoading: true});
        this.setState({article: newArticle})
        fetch(id+'.json')
        .then(function(result){
          return result.json();
        }).then(function(json){
          this.setState({
            article: {
              item: {
                title: json.title,
                desc: json.desc
              },
              isLoading: false
            }
          })
        }.bind(this))
        console.log(id);
      }}></Nav>

      var ArticleTag = null;
      if(this.state.article.isLoading){
        ArticleTag = <NowLoading></NowLoading>
      }
      else {
        ArticleTag = 
        <Article title={this.state.article.item.title} desc={this.state.article.item.desc}></Article>
      }
    }
    return (
      <div className="App">
        <h1 className="header">WEB</h1>
        {NavTag}
        {ArticleTag}


      </div>
    );
  }
}

export default App;
