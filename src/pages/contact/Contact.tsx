import { useState } from "react";
import { FaWhatsapp, FaBehance, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Button, Container, Form, IconLink, Input, LinkGroup, LinksContainer, Subtitle, Textarea, Title } from "./styles";
import emailjs from 'emailjs-com';

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Parámetros que usás en la plantilla de EmailJS
    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
    };
  
    emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID_EMAILJS as string,      // 👉 tu Service ID
      process.env.NEXT_PUBLIC_TEMPLATE_ID_EMAILJS as string,     // 👉 tu Template ID
      templateParams,
      process.env.NEXT_PUBLIC_PUBLIC_KEY_EMAILJS as string   // 👉 tu Public Key (User ID)
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert(`✅ Gracias ${form.name}, tu mensaje fue enviado.`);
      setForm({
        name: "",
        email: "",
        message: "",
      });
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert('❌ Ocurrió un error. Intenta nuevamente.');
    });
  };
  

  return (
    <Container>
      <Title>Contáctame</Title>
      <Subtitle>¡Hablemos de tu proyecto o idea!</Subtitle>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Tu Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="Tu Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Textarea
          name="message"
          placeholder="Tu Mensaje"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
        ></Textarea>

        <Button type="submit">Enviar Mensaje</Button>
      </Form>

      <LinksContainer>
        <LinkGroup>
          <IconLink
            href="https://wa.me/+34653032511"
            target="_blank"
            rel="noopener noreferrer"
            color="#10b981"
            hoverColor="#059669"
          >
            <FaWhatsapp />
          </IconLink>

          <IconLink
            href="martin@seismotionstudio.com"
            color="#374151"
            hoverColor="#1f2937"
          >
            <FaEnvelope />
          </IconLink>
          <IconLink
            href="https://www.behance.net/tinalbi"
            target="_blank"
            rel="noopener noreferrer"
            color="#3b82f6"
            hoverColor="#1d4ed8"
          >
            <FaBehance />
          </IconLink>

          <IconLink
            href="https://www.instagram.com/seis.motionstudio/"
            target="_blank"
            rel="noopener noreferrer"
            color="#ec4899"
            hoverColor="#db2777"
          >
            <FaInstagram />
          </IconLink>

          <IconLink
            href="https://www.linkedin.com/in/martin-albiñana-716a51319/"
            target="_blank"
            rel="noopener noreferrer"
            color="#2563eb"
            hoverColor="#1d4ed8"
          >
            <FaLinkedin />
          </IconLink>
        </LinkGroup>
      </LinksContainer>
    </Container>
  );
};

export default Contact;
