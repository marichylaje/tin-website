import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: inherit;
`;

export const Subtitle = styled.p`
  margin-bottom: 2rem;
  font-family: inherit;
`;

export const Form = styled.form`
  background-color: #ffffff;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  gap: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  background-color: white;
  font-family: inherit;
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
  &::placeholder {
    font-family: inherit;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  background-color: white;
  resize: none;
  font-family: inherit;
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
  &::placeholder {
    font-family: inherit;
  }
`;

export const Button = styled.button`
  background-color: #2e42a9;
  color: #ffffff;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: inherit;
  &:hover {
    background-color: #1d4ed8;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1.5rem;
`;

export const LinkGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const IconLink = styled.a<{ color: string; hoverColor: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.color};
  font-size: 1.25rem;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;

  &:hover {
    color: #ffffff;
    background-color: ${(props) => props.hoverColor};
  }
`;