import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishDetails from './DishDetailsComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null,
            selectComments: null
        };        
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish, selectComments: dish.comments});
    }
    
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() =>this.onDishSelect(dish)}>                        
                        <CardImg src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <DishDetails dish={this.state.selectedDish} />
            </div>
        );
    }
}

export default Menu;