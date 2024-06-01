import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../config/firebase'; // Ensure this path is correct
import{ useNavigate }  from "react-router-dom"

export const Createform = () => {
  const [user] = useAuthState(auth);
  const navigate=useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    discription: yup.string().required("You must add a description."),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const oncreatepost = async (data) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userid: user?.uid,
    });
    navigate("/")
    
  };

  return (
    <form onSubmit={handleSubmit(oncreatepost)}>
      <input placeholder='Title...' {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <textarea placeholder='Description...' {...register("discription")} />
      <p style={{ color: "red" }}>{errors.discription?.message}</p>
      <input type='submit' />
    </form>
  );
};
