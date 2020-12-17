import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, Row, 
    CardImg, CardText, CardTitle, Modal, ModalBody, ModalHeader, Button, Label } from 'reactstrap';
import { LocalForm, Errors, Control } from 'react-redux-form';

    // const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len)


function RenderDish({dish}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comments.map((comment) => 
                    <li key={comment.id}>
                        <p>{comment.comment}</p> 
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                )}
            </ul>
            <CommentForm />
        </div>
    )
}

const DishDetails = (props) => {
    if (props.dish != null) {
        return (            
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />                       
                    <RenderComments comments={props.comments} />                       
                </div>                    
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState ({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        alert('Current State is : ' + JSON.stringify(values));
        console.log('Current State is : ' + JSON.stringify(values))
    }

    render() {
        return (                                           
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor="username">Your Name</Label>
                                    <Control.text model=".username" id="username" name="usename" className="form-control"
                                        validators={{maxLength: maxLength(15), minLength: minLength(3)}} />
                                        <Errors 
                                            className="text-danger"
                                            model=".username"
                                            show="touched"
                                            messages={{
                                                maxLength: "Must be 15 character or less",
                                                minLength: "Must be at least 3 character"
                                            }}/>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".commnet" id="comment" name="comment" rows='6' className="form-control"/>
                                </Row>
                                <Row className='form-group'>
                                    <Button type="submit" color="primary">Submit</Button>  
                                </Row>                                                                   
                            </LocalForm>
                        </div>
                    </ModalBody>                        
                </Modal>
            </div>
        );
    }
}

export default DishDetails;