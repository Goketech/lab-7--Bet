import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';

const EditPost = () => {
  const [post, setPost] = useState({
    title: '',
    author: '',
    description: '',
  });

  const { id } = useParams();

  useEffect(() => {
    // Fetch the post data with the specified id and update the state
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [id]);

  const updatePost = async (event) => {
    event.preventDefault();
    try {
      await supabase
        .from('Posts')
        .update({
          title: post.title,
          author: post.author,
          description: post.description,
        })
        .eq('id', id);

      // Optionally, you might want to fetch the updated data again here to reflect the changes immediately
      // const { data } = await supabase.from('Posts').select('*').eq('id', id).single();
      // setPost(data);

      window.location = '/';
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from('Posts').delete().eq('id', id);

    window.location = 'http://localhost:3000/';
  };

  const handleTitleChange = (event) => {
    setPost({ ...post, title: event.target.value });
  };

  const handleAuthorChange = (event) => {
    setPost({ ...post, author: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setPost({ ...post, description: event.target.value });
  };

  return (
    <div>
      <form onSubmit={updatePost}>
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleTitleChange}
        />
        <br />
        <br />
        <label htmlFor="author">Author</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleAuthorChange}
        />
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          value={post.description}
          onChange={handleDescriptionChange}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
        <button onClick={deletePost} className="deleteButton">
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditPost;
