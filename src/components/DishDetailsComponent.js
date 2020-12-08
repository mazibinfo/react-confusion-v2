import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
        if(dish) {
            return(
                <Card>
                    <CardImg top src={dish.image}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    function RenderComments({dish}) {
        if(dish) {
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {dish.comments.map((comment) => 
                            <li key={comment.id}>
                                <p>{comment.comment}</p> 
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        )}
                    </ul> 
                </div>
            )
        }        
        else {
            return(
                <div></div>
            )
        }
    }

    const DishDetails = (props) => {
        return (            
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">                        
                        <RenderComments dish={props.dish} />
                    </div>
                </div>
            </div>
        )
    }

export default DishDetails;