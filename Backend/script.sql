
CREATE TABLE usuario (
    id_user UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    user_name TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
	categoria TEXT NOT NULL,
	quanti_post INT DEFAULT 0,
	biografia TEXT 
	
);

CREATE TABLE postagem (
    id_post UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    descricao TEXT,
	data_post  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	categoria TEXT NOT NULL,
	criadores TEXT NOT NULL
);

CREATE TABLE criar_postagem (
    id_post UUID REFERENCES postagem(id_post) ON DELETE CASCADE,
    id_user UUID REFERENCES usuario(id_user) ON DELETE CASCADE,
    PRIMARY KEY (id_post,id_user)
);

SELECT
    u.nome,
    u.user_name,
    p.id_post,
    p.nome AS titulo_post,
    p.descricao,
    p.categoria,
    p.data_post
FROM criar_postagem cp
INNER JOIN usuario u
    ON cp.id_user = u.id_user
INNER JOIN postagem p
    ON cp.id_post = p.id_post;