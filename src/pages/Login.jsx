import React, { useState, useEffect, useContext } from "react";
import { Center, VStack, Button, Field, Input, Text } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // ⬅️ path harus sesuai
import axios from "axios";

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [namaPengguna, setNamaPengguna] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Mencoba login dengan:", { namaPengguna, password });
      console.log("API URL:", import.meta.env.VITE_REACT_APP_API_BASE_URL);

      const success = await login(namaPengguna, password);
      console.log("Hasil login:", success);

      if (success) {
        // Redirect ke halaman yang dimaksud atau home
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError("Nama pengguna atau password salah!");
      }
    } catch (err) {
      console.error("Error saat login:", err);
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Login useEffect triggered, isAuthenticated:", isAuthenticated);

    // Hanya redirect jika user sudah login dan tidak ada parameter untuk force login
    const urlParams = new URLSearchParams(window.location.search);
    const forceLogin = urlParams.get("force");

    console.log("Force login parameter:", forceLogin);

    // Jika ada parameter force=true, hapus parameter tersebut dari URL
    if (forceLogin === "true") {
      console.log(
        "Force login detected, cleaning URL and staying on login page"
      );
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
      return; // Jangan redirect, biarkan user tetap di halaman login
    }

    if (isAuthenticated && !forceLogin) {
      console.log("User authenticated, redirecting to home");
      navigate("/");
    } else {
      console.log(
        "User not authenticated or force login, staying on login page"
      );
    }
  }, [isAuthenticated, navigate]);

  return (
    <Center bgColor={"primary"} height={"100vh"}>
      <Center boxShadow="md" borderRadius={"8px"} p={"100px"}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} w={"600px"}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Login Sistem
            </Text>

            <Field.Root>
              <Field.Label fontSize="24px">Nama Pengguna</Field.Label>
              <Input
                placeholder="contoh: sifulan"
                value={namaPengguna}
                onChange={(e) => setNamaPengguna(e.target.value)}
                height="60px"
                disabled={isLoading}
              />
              {error && <Field.ErrorText>{error}</Field.ErrorText>}
            </Field.Root>

            <Field.Root>
              <Field.Label fontSize="24px">Password</Field.Label>
              <Input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                height="60px"
                type="password"
                disabled={isLoading}
              />
            </Field.Root>

            <Button
              type="submit"
              variant={"primary"}
              height="60px"
              w={"100%"}
              isLoading={isLoading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </VStack>
        </form>
      </Center>
    </Center>
  );
};

export default Login;
