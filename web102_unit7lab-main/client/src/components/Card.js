import React, { useState, useEffect } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const Card = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchBetCount() {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('betCount')
          .eq('id', props.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setCount(data.betCount);
        }
      } catch (error) {
        console.error('Error fetching bet count:', error);
      }
    }

    fetchBetCount();
  }, [props.id]);

  const updateCount = async (event) => {
    event.preventDefault();

    try {
      await supabase
        .from('Posts')
        .update({ betCount: count + 1 })
        .eq('id', props.id);

      setCount(count + 1);
    } catch (error) {
      console.error('Error updating bet count:', error);
    }
  };

  return (
    <div className="Card">
      <Link to={'edit/' + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="title">{props.title}</h2>
      <h3 className="author">{'by ' + props.author}</h3>
      <p className="description">{props.description}</p>
      <button className="betButton" onClick={updateCount}>
        👍 Bet Count: {count}
      </button>
    </div>
  );
};

export default Card;
