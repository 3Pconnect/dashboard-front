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
  