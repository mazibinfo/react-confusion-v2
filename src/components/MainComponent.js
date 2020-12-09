import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/commnets';
import { Switch, Redirect, Route } from 'react-router-dom';


class Main extends Component {
    constructor(props) {
            super(props);
            this.state = {
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS,
            commnets: COMMENTS
        };
    }

    render() {        
        const HomePage = () => {
            return(
                <Home 
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                    commnet={this.state.commnets.filter((commnet) =>commnet.featured)[0]}
                    promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
                />
            );
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} /> } />
                    <Route exact path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
