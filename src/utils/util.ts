export const savePermissionsToLocalStorage = (permissions: string[]): void => {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  };
  
  export const getPermissionsFromLocalStorage = (): string[] => {
    const permissions = localStorage.getItem('permissions');
    if (permissions) {
      return JSON.parse(permissions);
    }
    return []; 
  };

  export const hasPermission = (permission: string): boolean => {
    const permissions = getPermissionsFromLocalStorage();
    return permissions.includes(permission);
  };
  export const truncateString = (str:string, maxLength:number) =>{
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
    }
    return str;
  }

  export function reduzirTexto(texto: string, limite: number): string {
    if (texto.length <= limite) return texto;
    return texto.slice(0, limite) + '...';
  }