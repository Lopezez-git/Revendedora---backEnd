CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    cargo ENUM('ADM', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE'
);

CREATE TABLE produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    descricao VARCHAR(200) NOT NULL,
    imagem VARCHAR(500),
    estoque int not null
)

CREATE TABLE venda (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    data_venda DATETIME DEFAULT NOW(),
    valor_total DECIMAL(10, 2) NOT NULL,
    status enum('pago', 'em andamento', 'pendente'),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE venda_item (
    id int PRIMARY key AUTO_INCREMENT,
    id_venda INT NOT NULL,
    id_produto INT NOT NULL,
    qtd INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_venda) REFERENCES venda(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);