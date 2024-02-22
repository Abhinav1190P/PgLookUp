import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import toast from "react-hot-toast";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const api = useAxiosPrivate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            // Check if any field is empty
            toast.error('Please fill out all fields');
            return;
          }
        try {
            let formData = {
                name: name,
                email: email,
                message: message
            }
            const response = await api.post('http://localhost:4000/api/user/SubmitContactForm', formData);


            if (response.status === 200) {
                toast.success('Form submitted successfully');
                setName('')
                setEmail('')
                setMessage('')
            } else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: 600,
                    mx: "auto",
                    p: 2,
                    border: "2px solid  #00A8CC",
                    borderRadius: "12px",
                    boxShadow: 1,
                }}
            >
                <Typography variant="h4" align="center" mb={2}>
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        type="email"
                    />
                    <TextField
                        fullWidth
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        margin="normal"
                        required
                        multiline
                        rows={4}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            mt: 2,
                            backgroundColor: "#00A8CC",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#111",
                            },
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
}