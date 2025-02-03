import { HStack, IconButton } from "@chakra-ui/react";
import { FaSignOutAlt, FaUser, FaBlog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate()
    return (
        <HStack>
            <IconButton size={"sm"} onClick={() => {
                navigate("/feed")
            }} aria-label="feed">
                <FaBlog />
            </IconButton>

            <IconButton size={"sm"} onClick={() => {
                navigate("/profile")
            }} aria-label="profile">
                <FaUser />
            </IconButton>

            <IconButton size={"sm"} onClick={() => {
                localStorage.clear();
                navigate("/")
            }} aria-label="sair">
                <FaSignOutAlt />
            </IconButton>
        </HStack>
    )
}