import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetails from './DishDetailsComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchProms, fetchComments } from '../redux/ActionCreators';
import { actions } from 'react-redux-form'


const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    };
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForms: () => {dispatch(actions.reset('feedback'))},
    fetchProms: () => {dispatch(fetchProms())},
    fetchComments: () => {dispatch(fetchComments())}
})


class Main extends Component {
    constructor(props) {        
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchProms();
        this.props.fetchComments();
    }

    render() {        
        const HomePage = () => {
            return(
                <Home 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                    promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                    promsLoading={this.props.promotions.isLoading}
                    promsErrMess={this.props.promotions.errMess}
                />
            );
        }

        const dishWithId = ({match}) => {
            return(
                <DishDetails 
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess} 
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMess}
                    addComment={this.props.addComment}
                />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} /> } />
                    <Route path="/menu/:dishId" component={dishWithId} />
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForms={this.props.resetFeedbackForms} />} />
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} /> } />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
