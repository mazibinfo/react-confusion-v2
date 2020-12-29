import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, Row, 
    CardImg, CardText, CardTitle, Modal, ModalBody, ModalHeader, Button, Label } from 'reactstrap';
import { LocalForm, Errors, Control } from 'react-redux-form';
import { Loading } from './LoadingComponent';

    // const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component {
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
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        // alert('Current State is : ' + JSON.stringify(values));
        // console.log('Current State is : ' + JSON.stringify(values))
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
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author" className="form-control"
                                        validators={{maxLength: maxLength(15), minLength: minLength(3)}} />
                                        <Errors 
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                maxLength: "Must be 15 character or less",
                                                minLength: "Must be at least 3 character"
                                            }}/>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows='6' className="form-control"/>
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

function RenderComments({comments, addComment, dishId}) {
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
            <CommentForm addComment={addComment} dishId={dishId}/>
        </div>
    )
}

const DishDetails = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>            
        )
    }
    else if (props.dish != null) {
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
                    <RenderComments comments={props.comments}
                                    addComment={props.addComment}
                                    dishId={props.dish.id} />                       
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

export default DishDetails;