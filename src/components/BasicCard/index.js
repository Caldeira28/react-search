import "./basic-card.css";
import olho from "../../imagens/olho.jpg";

function BasicCard(props) {
    const myDate = new Date(props.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const cardImg = props.imgPath
        ? props.imgPath
        : olho;
    return (
        <div className="basic-card" id={props.id}>
            <img src={cardImg} className="basic-card__img" alt={props.alt} />
            <div className="basic-card__body">
                {props.date && <span>{myDate}</span>}
                <h5>{props.title}</h5>
                <p className="basic-card__description">{props.description}</p>
                <a href={props.url}>{props.link}</a>
            </div>
        </div>
    );
}

export default BasicCard;
