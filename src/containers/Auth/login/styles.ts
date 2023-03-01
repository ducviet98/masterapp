import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled, { keyframes } from 'styled-components';

const useStyles = makeStyles((theme: Theme) => ({
  layoutContainer: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  card: {
    padding: '30px 70px 80px 70px',
    width: 420,
    maxWidth: '100%',
    boxShadow: '1px 1px 15px 1px #000f5d',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    '& > h3 ': {
      fontSize: 22,
      marginBottom: 40,
    },
    '& .MuiOutlinedInput-input': {
      WebkitBoxShadow: '0 0 0 30px #FFFFFF inset'
    },
  },
  textError: {
    textAlign: 'center',
    color: theme.palette.error.main
  }
}));


const Root = styled.div`
  background: #514fc1;
  background: -webkit-linear-gradient(to left, #e43af7, #5ed0dd);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -7%;
  z-index: 2;
`;

const Form = styled.form`
  width: 100%;
  .MuiButton-root {
    border-radius: 0;
  }
  .MuiInputBase-root {
    height: 45px;
  }
  .MuiInputLabel-outlined {
    transform: translate(14px, 22px) scale(1);
    font-size: 14px;
  }
  .MuiOutlinedInput-input {
    padding: 12.5px 14px;
    font-size: 14px;
  }
  .MuiInputLabel-shrink {
    transform: translate(14px, -6px) scale(0.7);
  }
`;
const Field = styled.div`
  margin-bottom: 20px;
  .MuiOutlinedInput-root {
    border-radius: 0;
  }
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  & > button {
    width: 100%;
    height: 40px;
    text-transform: none;
  }
  .MuiCircularProgress-root {
    position: absolute;
    top: 55%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
  }
`;

const Error = styled(Center)`
  color: #f94839;
  font-size: 14px;
  margin: 1rem 0;
`;

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.38);
  padding: 11px;
  color: #ffffff;
  margin-bottom: 50px;
`;

const animate = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
`;

const Circles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  & > li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: ${animate} 25s linear infinite;
    bottom: -150px;
  }
  li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }
  li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }
  li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }
  li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }
  li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }
  li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }
  li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }
  li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }
  li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }
  li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }
`;

export { Root, Content, useStyles, Form, Field, Center, Error, Title, Circles };
