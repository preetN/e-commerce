import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { setAdmin } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
function Header() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  useEffect(() => {
    !admin?.uid && navigate("/");
  }, [admin, navigate]);
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Tech CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {admin?.uid && (
              <Button
                className="nav-link"
                onClick={() => {
                  dispatch(setAdmin({}));
                  return toast.success("Logged out");
                }}
              >
                Logout <BiLogOut />
              </Button>
            )}

            {admin?.uid ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "40px",
                  borderRadius: "50%",
                  backgroundColor: "grey",
                  alignItems: "center",
                }}
              >
                {admin.fname[0].toUpperCase()}
              </div>
            ) : (
              <Link className="nav-link" to="/">
                Login <BiLogIn />
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
