import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightblue;
    border-radius: 10px;
    height: 100%;

    button{
        border-radius: 10px;
        border: transparent;
        background: #ffffff;

    }

    img {
        max-height: 250px;
        padding: 0.5rem;
        object-fit: cover;
        border-bottom: 2px solid gray;
    }

    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }
`