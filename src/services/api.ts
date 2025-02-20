import axios from 'axios';
const url = process.env.REACT_APP_API_URL;
console.log("URL:", url)
const api = axios.create({
  baseURL: 'https://api.seminariomecanicospremium.com.br',
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



export default api;
