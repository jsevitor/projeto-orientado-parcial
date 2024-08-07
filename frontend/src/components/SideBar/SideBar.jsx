import {
  BsArrowLeftRight,
  BsBoxSeam,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
  BsGear,
  BsHouse,
  BsPersonCircle,
  BsReverseLayoutTextWindowReverse,
} from "react-icons/bs";
import {
  Container,
  HideMenu,
  Icon,
  ItemTitle,
  MenuItem,
  MenuItems,
  NavContainer,
  ProfileContainer,
  SubMenu,
  SubMenuItem,
} from "./Styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Componente de barra lateral de navegação.
 *
 * @component
 * @param {Object} props - As props que o componente aceita.
 * @param {boolean} props.active - Indica se a barra lateral está ativa.
 * @param {boolean} props.menuCollapsed - Indica se o menu está colapsado.
 * @param {Function} props.setMenuCollapsed - Função para definir o estado colapsado do menu.
 * @returns {JSX.Element} O elemento SideBar.
 *
 * @example
 * // Uso do SideBar
 * <SideBar active={isActive} menuCollapsed={isCollapsed} setMenuCollapsed={setCollapsed} />
 */
const SideBar = ({ active, menuCollapsed, setMenuCollapsed }) => {
  const [subMenus, setSubMenus] = useState({
    produtos: localStorage.getItem("isOpenProdutosSubMenu") === "true",
    cadastros: localStorage.getItem("isOpenCadastrosSubMenu") === "true",
    movimentacoes:
      localStorage.getItem("isOpenMovimentacoesSubMenu") === "true",
  });

  useEffect(() => {
    localStorage.setItem("isOpenProdutosSubMenu", subMenus.produtos);
    localStorage.setItem("isOpenCadastrosSubMenu", subMenus.cadastros);
    localStorage.setItem("isOpenMovimentacoesSubMenu", subMenus.movimentacoes);
    localStorage.setItem("menuCollapsed", menuCollapsed);
  }, [subMenus, menuCollapsed]);

  /**
   * Alterna o estado do sub-menu especificado entre aberto e fechado.
   * @param {string} menu - O nome do sub-menu a ser alternado.
   */
  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));

    if (menuCollapsed) {
      setMenuCollapsed(false);
    }
  };

  /**
   * Alterna o estado do menu entre colapsado e expandido.
   */
  const toggleMenu = () => {
    setMenuCollapsed(!menuCollapsed);

    if (subMenus.produtos || subMenus.cadastros || subMenus.movimentacoes) {
      setSubMenus({
        produtos: false,
        cadastros: false,
        movimentacoes: false,
      });
    }
  };

  return (
    <Container sidebar={active} className={menuCollapsed ? "collapsed" : ""}>
      <HideMenu
        onClick={toggleMenu}
        className={menuCollapsed ? "collapsed" : ""}
      >
        {menuCollapsed ? (
          <Icon as={BsChevronLeft} />
        ) : (
          <Icon as={BsChevronRight} />
        )}
      </HideMenu>
      <hr />
      <NavContainer>
        <MenuItems className={menuCollapsed ? "collapsed" : ""}>
          <MenuItem>
            <Link to={"/"}>
              <Icon as={BsHouse} />
              {!menuCollapsed && <ItemTitle>Início</ItemTitle>}
            </Link>
          </MenuItem>

          <MenuItem>
            <Link to={"#"} onClick={() => toggleSubMenu("cadastros")}>
              <Icon as={BsReverseLayoutTextWindowReverse} />
              {!menuCollapsed && <ItemTitle>Cadastros</ItemTitle>}
              {!menuCollapsed &&
                (subMenus.cadastros ? <BsChevronUp /> : <BsChevronDown />)}
            </Link>
            {!menuCollapsed && (
              <SubMenu isOpen={subMenus.cadastros}>
                <SubMenuItem
                  className={subMenus.cadastros ? "collapsedSubMenu" : ""}
                >
                  <Link to={"/cadastro-fornecedor"}>
                    <ItemTitle>Cadastro de Fornecedor</ItemTitle>
                  </Link>
                  <Link to={"/cadastro-produto"}>
                    <ItemTitle>Cadastro de Produto</ItemTitle>
                  </Link>
                  <Link to={"/cadastro-usuario"}>
                    <ItemTitle>Cadastro de Usuário</ItemTitle>
                  </Link>
                </SubMenuItem>
              </SubMenu>
            )}
          </MenuItem>

          <MenuItem>
            <Link to={"#"} onClick={() => toggleSubMenu("produtos")}>
              <Icon as={BsBoxSeam} />
              {!menuCollapsed && <ItemTitle>Produtos</ItemTitle>}
              {!menuCollapsed &&
                (subMenus.produtos ? <BsChevronUp /> : <BsChevronDown />)}
            </Link>
            {!menuCollapsed && (
              <SubMenu isOpen={subMenus.produtos}>
                <SubMenuItem>
                  <Link to={"/entrada-produtos"}>
                    <ItemTitle>Entrada de Produtos</ItemTitle>
                  </Link>
                  <Link to={"/retirada-produtos"}>
                    <ItemTitle>Retirada de Produtos</ItemTitle>
                  </Link>
                  <Link to={"/produtos-cadastrados"}>
                    <ItemTitle>Produtos de Cadastrados</ItemTitle>
                  </Link>
                </SubMenuItem>
              </SubMenu>
            )}
          </MenuItem>

          <MenuItem>
            <Link to={"#"} onClick={() => toggleSubMenu("movimentacoes")}>
              <Icon as={BsArrowLeftRight} />
              {!menuCollapsed && <ItemTitle>Movimentações</ItemTitle>}
              {!menuCollapsed &&
                (subMenus.movimentacoes ? <BsChevronUp /> : <BsChevronDown />)}
            </Link>
            {!menuCollapsed && (
              <SubMenu isOpen={subMenus.movimentacoes}>
                <SubMenuItem
                  className={subMenus.movimentacoes ? "collapsedSubMenu" : ""}
                >
                  <Link to={"/movimentacoes"}>
                    <ItemTitle>Movimentações</ItemTitle>
                  </Link>
                  <Link to={"/cadastro-fornecedor"}>
                    <ItemTitle>Entradas Cadastradas</ItemTitle>
                  </Link>
                  <Link to={"/cadastro-fornecedor"}>
                    <ItemTitle>Retiradas Cadastradas</ItemTitle>
                  </Link>
                </SubMenuItem>
              </SubMenu>
            )}
          </MenuItem>

          <MenuItem>
            <Link to={"/painel-controle"}>
              <Icon as={BsGear} />
              {!menuCollapsed && <ItemTitle>Painel de Controle</ItemTitle>}
            </Link>
          </MenuItem>
        </MenuItems>
      </NavContainer>
      <hr />
      <ProfileContainer className={menuCollapsed ? "collapsed" : ""}>
        <Icon as={BsPersonCircle} />
        {!menuCollapsed && <ItemTitle>Fulano de Tal</ItemTitle>}
      </ProfileContainer>
    </Container>
  );
};

export default SideBar;
