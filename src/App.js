import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Clarifai from 'clarifai';

const app= new Clarifai.App({
  apiKey: '6ba473f99dd346b9ac4cfd50ffd6b614'
})


const particlesOptions ={
  particles:{
    number:{
      value:100,
      density:{
        enable:true,
        value_area:500
      }
    }
  }
}



class App extends Component {
 constructor(){
  super();
  this.state={
    input:'',
    imageUrl:''
  }
 } 
 
 onInputChange=(event)=>{
  this.setState({input:event.target.value});
 }

 onButtonSubmit=()=>{
  
   this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
       .then(
        function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err){
          
        }
      )
     }



      //if (response) {
      //     fetch('http://localhost:3000/image', {
      //       method: 'put',
      //       headers: {'Content-Type': 'application/json'},
      //       body: JSON.stringify({
      //         id: this.state.user.id
      //       })
      //     })
      //       .then(response => response.json())
      //       .then(count => {
      //         this.setState(Object.assign(this.state.user, { entries: count}))
      //       })

      //   }
      //   this.displayFaceBox(this.calculateFaceLocation(response))
      // })
      // .catch(err => console.log(err));
  
render(){
  return (
   
    <div className="App">
    <Particles className='particles'
                params={particlesOptions} />
     <Navigation />
     <Logo />
     <Rank />
     <ImageLinkForm
      onInputChange={this.onInputChange}
      onButtonSubmit={this.onButtonSubmit}/>
     <FaceRecognition  imageUrl={this.state.imageUrl}/>
    </div>
  );
 }
}
export default App;
