import React from 'react';
import './Card.css';
import highPriorityIcon from './Img - High Priority.svg';
import mediumPriorityIcon from './Img - Medium Priority.svg';
import lowPriorityIcon from './Img - Low Priority.svg';
import noPriorityIcon from './No-priority.svg';
// import userIcon from './user'; // Assuming the user icon is correctly imported

const Card = ({ id, title, tags, status, priority }) => {
  const priorityIcons = {
    High: highPriorityIcon,
    Medium: mediumPriorityIcon,
    Low: lowPriorityIcon,
    default: noPriorityIcon,
  };

  const getPriorityIcon = (priorityLevel) => priorityIcons[priorityLevel] || priorityIcons.default;

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: '5px' }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: 'uppercase' }} className="color-grey">
          #{id}
        </span>
        <div className="imageContainer relative" style={{ width: '30px', height: '30px' }}>
          <img
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            // src=
            alt="User Icon"
          />
          <div className={`statusIndicator ${status}`}></div>
        </div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 300 }}>
        <p>{title}</p>
      </div>
      <div className="cardTags">
        <div className="tags color-grey">
          <img
            src={getPriorityIcon(priority)}
            alt="Priority Icon"
            style={{ width: '20px', height: '20px' }}
          />
        </div>
        {tags?.map((tagItem, index) => (
          <div key={index} className="tags color-grey">
            <span>•</span> {tagItem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
