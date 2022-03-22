import React, { Component} from 'react';  
import './index.css';
import './index.scss';
import './index.css';
import fullHeart from './/fullheart.png';
import emptyHeart from './/emptyheart.png';


class HeartDisp extends Component {  
    constructor(props) {
        super(props);  
        
    }
    
    heartDisp = (heart,num) =>{
        if(num == 3 && heart == "heart1"){
            return fullHeart;
        }else if(num == 3 && heart == "heart2"){
            return fullHeart;
        }else if(num == 3 && heart == "heart3"){
            return fullHeart;
        }else if(num == 2 && heart == "heart2"){
            return fullHeart;
        }else if(num == 2 && heart == "heart3"){
            return fullHeart;
        }else if(num == 1 && heart == "heart3"){
            return fullHeart;
        }else{
            return emptyHeart;
        }
        
    }
    
  
    render() {  
        let {numHearts} = this.props;
        return(
            <div id= {this.props.refresh} class="health">
            <img id= 'heart1' class="heart" src={this.heartDisp("heart1",numHearts)}></img>
            <img id= 'heart2' class="heart" src={this.heartDisp("heart2",numHearts)}></img>
            <img id= 'heart3' class="heart" src={this.heartDisp("heart3",numHearts)}></img>
            </div>
            
          );
    }  
}  


  export default (HeartDisp); 