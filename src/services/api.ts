import axios from 'axios';
import dayjs from 'dayjs';
const url = process.env.REACT_APP_API_URL;
console.log("URL:", url)
const api = axios.create({
  //baseURL: 'https://api.seminariomecanicospremium.com.br',
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createProfile = async (name: string, permissions: string[]) => {
  try {
    const response = await api.post("/profile", { name, permissions });

    if (!response.data || !response.data.id) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar perfil:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao criar perfil");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao criar perfil.");
    }
  }
};

export const updateUserPassword = async (id: string, password: string) => {
  try {
    const response = await api.put(`/auth/${id}/password/update`, { password });

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar senha:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao atualizar senha");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao atualizar senha.");
    }
  }
};


export const fetchUser = async (userId: number) => {
  try {
    const response = await api.get(`/auth/user/${userId}`, {
      headers: {
        "accept": "*/*", // Cabeçalho aceitando todos os tipos de resposta
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data; // Retorna os dados do usuário
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar usuário");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar usuário.");
    }
  }
};

export const fetchMembros = async (
  page: number,
  limit: number,
  startDate?: string,
  endDate?: string,
  filters: any = {}
) => {
  try {
    const response = await api.get("/membros", {
      params: {
        page,
        limit,
        ...(filters.obj.name && { name: filters.obj.name }),
        ...(filters.obj.email && { email: filters.obj.email }),
        ...(filters.obj.situacao && { situacao: filters.obj.situacao }),
        startDate,
        endDate,
      },
    });

    if (!response.data || !response.data.membros) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar membros:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar membros");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar membros.");
    }
  }
};
export const fetchEventos = async (
  page: number,
  limit: number,
  startDate?: string,
  endDate?: string,
  filters: any = {}
) => {
  try {
    const response = await api.get("/eventos", {
      params: {
        page,
        limit,
        ...(filters.obj.nome_evento && { nome_evento: filters.obj.nome_evento }),
        ...(filters.obj.tema && { tema: filters.obj.tema }),
        startDate,
        endDate,
      },
    });

    if (!response.data || !response.data.eventos) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar eventos:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar eventos");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar eventos.");
    }
  }
};
export const fetchMeusEventos = async (
  page: number,
  limit: number,
  startDate?: string,
  endDate?: string,
  filters: any = {}
) => {
  try {
    const response = await api.get("/eventos/subscribed/all", {
      params: {
        page,
        limit,
        ...(filters.obj.nome_evento && { nome_evento: filters.obj.nome_evento }),
        ...(filters.obj.tema && { tema: filters.obj.tema }),
        startDate,
        endDate,
      },
    });

    if (!response.data || !response.data.eventos) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar eventos:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar eventos");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar eventos.");
    }
  }
};
export const fetchApoiadores = async (
  page: number,
  limit: number,
  startDate?: string,
  endDate?: string,
  filters: any = {}
) => {
  try {
    const response = await api.get("/apoiador", {
      params: {
        page,
        limit,
        ...(filters.obj.name && { name: filters.obj.name }),
        ...(filters.obj.email && { email: filters.obj.email }),
        ...(filters.obj.cnpj && { cnpj: filters.obj.cnpj }),
        startDate,
        endDate,
      },
    });

    if (!response.data || !response.data.membros) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar membros:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar membros");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar membros.");
    }
  }
};
export const fetchMe = async () => {
  try {
    const response = await api.post("/auth/me");

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar informações do usuário:", error);

    if (error.response) {
      // Caso o erro venha da resposta da API (status 4xx ou 5xx)
      throw new Error(error.response.data?.message || "Erro ao buscar informações do usuário.");
    } else if (error.request) {
      // Caso o erro seja por falta de resposta (sem resposta do servidor)
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      // Caso seja um erro inesperado
      throw new Error("Erro inesperado ao buscar informações do usuário.");
    }
  }
};
export const aprovarMembro = async (id: number) => {
  try {
    const response = await api.put(`/membros/${id}/aprovar`);

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar informações do usuário:", error);

    if (error.response) {
      // Caso o erro venha da resposta da API (status 4xx ou 5xx)
      throw new Error(error.response.data?.message || "Erro ao buscar informações do usuário.");
    } else if (error.request) {
      // Caso o erro seja por falta de resposta (sem resposta do servidor)
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      // Caso seja um erro inesperado
      throw new Error("Erro inesperado ao buscar informações do usuário.");
    }
  }
};
export const reprovarMembro = async (id: number) => {
  try {
    const response = await api.put(`/membros/${id}/reprovar`);

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar informações do usuário:", error);

    if (error.response) {
      // Caso o erro venha da resposta da API (status 4xx ou 5xx)
      throw new Error(error.response.data?.message || "Erro ao buscar informações do usuário.");
    } else if (error.request) {
      // Caso o erro seja por falta de resposta (sem resposta do servidor)
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      // Caso seja um erro inesperado
      throw new Error("Erro inesperado ao buscar informações do usuário.");
    }
  }
};

export const fetchProfiles = async (page: number, limit: number, name?: string, startDate?: string, endDate?: string) => {
  try {
    const response = await api.get("/profile", {
      params: { page, limit, name, startDate, endDate },
    });

    if (!response.data || !response.data.profiles) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar perfis:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar perfis");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar perfis.");
    }
  }
};


export const deleteProfile = async (id: number) => {
  try {
    const response = await api.delete(`/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir perfil:", error);
    throw error;
  }
};

export const deleteMembro = async (id: number) => {
  try {
    const response = await api.delete(`/membros/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir membro:", error);
    throw error;
  }
};
export const deleteEvento = async (id: number) => {
  try {
    const response = await api.delete(`/eventos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir evento:", error);
    throw error;
  }
};
export const inscreverse = async (id: number) => {
  try {
    const response = await api.post(`/eventos/${id}/inscrever`);
    return response.data;
  } catch (error) {
    console.error("Erro ao inscrever-se ao evento:", error);
    throw error;
  }
};
export const fetchMembroById = async (id: number) => {
  try {
    const response = await api.get(`/membros/${id}`);

    if (!response.data || !response.data.id) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar membro:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar membro");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar membro.");
    }
  }
};


export const fetchProfileById = async (id: number) => {
  try {
    const response = await api.get(`/profile/${id}`);

    if (!response.data || !response.data.id) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar perfil:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar perfil");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar perfil.");
    }
  }
};
export const fetchUserCount = async (): Promise<number> => {
  try {
    const response = await api.get("/auth/count");
    console.log(response.data.total)

    return response.data.total;
  } catch (error: any) {
    console.error("Erro ao buscar a contagem de usuários:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar a contagem de usuários");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar a contagem de usuários.");
    }
  }
};

export const fetchTreinamentos = async () => {
  try {
    const response = await api.get("/eventos/dashboard/treinamentos", {
      headers: {
        accept: "*/*",
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar treinamentos:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar treinamentos");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar treinamentos.");
    }
  }
};


export const updateProfile = async (id: number, name: string, permissions: string[]) => {
  try {
    const response = await api.put(`/profile/${id}`, { name, permissions });

    if (!response.data || !response.data.id) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao atualizar perfil");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao atualizar perfil.");
    }
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  profile: string,
  situacao: string
) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
      profile,
      situacao,
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao registrar usuário");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao registrar usuário.");
    }
  }
};

export const fetchTaxaRenovacao = async () => {
  try {
    const response = await api.get("/membros/dashboard/taxa-renovacao", {
      headers: {
        accept: "*/*",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar taxa de renovação:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar taxa de renovação");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar taxa de renovação.");
    }
  }
};
interface RegisterMembroProps {
  name: string;
  email: string;
  tipo_usuario: string;
  telefone: string;
  nome_empresa: string;
  cargo: string;
  cnpj: string;
  atendimento_carros_premium: string;
  vencimento?: dayjs.Dayjs | null | string;
  bosch_car_service?: boolean;
  modulo_diagnostico_bosch?: boolean;
  equipamento_bosch?: boolean;
  em_dia_com_obrigacoes?: boolean;
  afiliacao?: boolean;
  dataEvento?: dayjs.Dayjs | null,
  site: string | '';
  instagram: string | '';
  estado: string | '';
  nivel: string | '';
}
export const registerMembro = async (data: RegisterMembroProps) => {
  try {
    const response = await api.post("/membros", {
      ...data, situacao: 'em_analise', tipo_usuario: 'membro'

    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar membro:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao registrar membro");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao registrar membro.");
    }
  }
};
export const registerEvento = async (
  nome_evento: string,
  cidade: string,
  estado: string,
  tema: string,
  situacao: string = "inativo",
  dataEvento: string,
) => {
  try {
    const response = await api.post("/eventos", {
      nome_evento,
      cidade,
      estado,
      tema,
      situacao,
      dataEvento
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar evento:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao registrar evento");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao registrar evento.");
    }
  }
};
export const registerApoiador = async (
  email: string,
  tipo_usuario: string,
  cargo: string,
  nome_empresa: string,
  cnpj: string,
  area_atuacao: string
) => {
  try {
    const response = await api.post("/apoiador", {
      email,
      tipo_usuario,
      cargo,
      nome_empresa,
      cnpj,
      area_atuacao,

    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar membro:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao registrar membro");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao registrar membro.");
    }
  }
};
export const updateApoiador = async (
  id: number,
  email: string,
  tipo_usuario: string,
  cargo: string,
  nome_empresa: string,
  cnpj: string,
  area_atuacao: string,
  nivel: string,
) => {
  try {
    const response = await api.put("/apoiador/" + id, {
      email,
      tipo_usuario,
      cargo,
      nome_empresa,
      cnpj,
      area_atuacao,
      nivel
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar membro:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao registrar membro");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao registrar membro.");
    }
  }
};

export const updateUser = async (
  username: string,
  email: string,
  profile: string,
  situacao: string,
  id: number,
) => {
  try {
    const response = await api.put(`/auth/${id}/update`, {
      username,
      email,
      profile,
      situacao,
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar usuário:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao atualizar usuário");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao atualizar usuário.");
    }
  }
};


export const updateMembro = async (
  id: number,
  data: {}
) => {
  try {
    const response = await api.put(`/membros/${id}`, {
      ...data, tipo_usuario: 'membro'
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar membro:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao atualizar membro");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao atualizar membro.");
    }
  }
};
export const createProduct = async (product: { nome: string; descricao: string; preco: number; estoque: number }) => {
  try {
    const response = await api.post("/produtos", product, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar produto:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao criar produto");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao criar produto.");
    }
  }
};
export const createVenda = async (venda: {
  quantidade: number;
  produtoId: number;
  quantidadeMaximaPorUsuario: number;
  quantidadeTotal: number;
  dataInicio: string;
  dataFim: string;
  situacao: string
}) => {
  try {
    const response = await api.post("/vendas", venda, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar venda:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao criar venda");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao criar venda.");
    }
  }
};
export const updateCompra = async (compraId: number, data: any) => {
  try {
    const response = await api.post(`/vendas/${compraId}/update`, {...data}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API ao atualizar a compra.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar a compra:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao atualizar a compra.");
    } else if (error.request) {
      throw new Error("Servidor não respondeu ao atualizar a compra. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao atualizar a compra.");
    }
  }
};

export const demonstrarInteresse = async (compraId: number, quantidade: number) => {
  try {
    const response = await api.post("/vendas/demonstrar-interesse", {
      compraId,
      quantidade,
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API ao demonstrar interesse.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao demonstrar interesse na venda:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao demonstrar interesse na venda.");
    } else if (error.request) {
      throw new Error("Servidor não respondeu ao demonstrar interesse. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao demonstrar interesse na venda.");
    }
  }
};
export const buscarVendaPorId = async (id: number) => {
  try {
    const response = await api.get(`/vendas/${id}/search`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API ao buscar venda.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar venda:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar venda.");
    } else if (error.request) {
      throw new Error("Servidor não respondeu ao buscar venda. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar venda.");
    }
  }
};

export const fetchProducts = async (nome: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get("/produtos", {
      params: {
        nome,
        limit,
        page,
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar produtos");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar produtos.");
    }
  }
};
export const fetchSales = async (page: number = 1, limit: number = 10, dataInicio?: string, dataFim?: string) => {
  try {
    const params: { [key: string]: any } = {
      page,
      limit,
    };

    if (dataInicio) params.dataInicio = dataInicio;
    if (dataFim) params.dataFim = dataFim;

    const response = await api.get('/vendas', {
      params,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }

    // Não precisamos mais verificar se é um array aqui, pois a verificação será feita no component.
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar vendas:', error);

    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao buscar vendas');
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Tente novamente mais tarde.');
    } else {
      throw new Error('Erro inesperado ao buscar vendas.');
    }
  }
};

export const fetchInteressadosCompra = async (
  compraId: number,
  page: number = 1,
  limit: number = 10,
) => {
  try {
    const response = await api.get<InteresseResponse>(
      `/vendas/compra/${compraId}/interessados`,
      {
        params: {
          page,
          limit,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar interessados:', error);

    if (error.response) {
      throw new Error(error.response.data?.message || 'Erro ao buscar interessados');
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Tente novamente mais tarde.');
    } else {
      throw new Error('Erro inesperado ao buscar interessados.');
    }
  }
}
interface InteresseResponse {
  data: {
    id: number;
    quantidade: number;
    dataInteresse: string;
    usuario: {
      id: number;
      username: string;
      email: string;
      password: string;
      situacao: string;
      createdAt: string;
    };
  }[];
  total: number;
  page: string;
  limit: string;
}


export const fetchVendasDisponiveis = async (
  page: number = 1,
  limit: number = 10,
  dataInicio?: string,
  dataFim?: string
) => {
  try {
    const params: any = { page, limit };

    if (dataInicio) params.dataInicio = dataInicio;
    if (dataFim) params.dataFim = dataFim;

    const response = await api.get("/vendas/disponiveis", {
      params,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar vendas disponíveis:", error);

    if (error instanceof Error) {
      if ((error as any).response) {
        throw new Error((error as any).response.data?.message || "Erro ao buscar vendas");
      } else if ((error as any).request) {
        throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
      }
      throw new Error(error.message);
    }

    throw new Error("Erro desconhecido ao buscar vendas.");
  }
};




export const fetchUsers = async (page: number, limit: number, filters: any = {}) => {

  try {
    const response = await api.get("/auth", {
      params: {
        page,
        limit,
        ...(filters.obj.name && { name: filters.obj.name }),
        ...(filters.obj.email && { email: filters.obj.email }),
        ...(filters.obj.profile && { profile: filters.obj.profile }),
        ...(filters.obj.situacao && { situacao: filters.obj.situacao }),
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
    });

    if (!response.data || !response.data.users) {
      throw new Error("Resposta inesperada da API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);

    if (error.response) {
      throw new Error(error.response.data?.message || "Erro ao buscar usuários");
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Tente novamente mais tarde.");
    } else {
      throw new Error("Erro inesperado ao buscar usuários.");
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/auth/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};
export const deleteVenda = async (id: string) => {
  try {
    const response = await api.delete(`/vendas/${id}`, {
      headers: {
        Accept: "*/*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir venda:", error);
    throw error;
  }
};


export const deleteProduto = async (id: string) => {
  try {
    const response = await api.delete(`/produtos/${id}`, {
      headers: {
        accept: '*/*',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }
};

export default api;
