import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return(
                <Loading />
        );
    }
    else if (errMess) {
        return(
                <h4>{errMess}</h4>
        );
    }
    else
    return(
        <FadeTransform
            in 
            transformProps = {{
                exitTransform: 'scale(0.5) TranslateY(-50%)'
            }}>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name}></CardImg>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>{item.designation ? item.designation: null}</CardSubtitle>
                    <CardText>{item.description}</CardText>                
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function Home(props) {
    return (
        <div className='container'>
            <div className='row align-items-start'>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                        isLoading={props.promsLoading}
                        errMess={props.promsErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}
                        isLoading={props.leadersLoading}
                        errMess={props.leadersErrMess} />
                </div>
            </div>
        </div>
    );
}

export default Home;