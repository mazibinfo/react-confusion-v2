import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

class DishDetails extends Component{

    renderDish(dish) {
        if(dish != null)
        return(
            <Card>
                <CardImg top src={dish.image}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
        else
        return(
            <div></div>
        )
    }

    renderComments(comments) {
        if(comments != null){
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => 
                        <li key={comment.id}>
                            <p>{comment.comment}</p> 
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                        )}
                    </ul> 
                </div>
            )
        }
        
        else{
            return(
            <div></div>
            )
        }
    }

    render() {
        return (            
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">                        
                        {this.renderComments(this.props.dish ? this.props.dish.comments: null)}
                    </div>
                </div>
            </div>
        )
    }
}

export default DishDetails;