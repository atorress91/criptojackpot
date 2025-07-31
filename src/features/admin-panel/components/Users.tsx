'use client';

import React from 'react';
import Table from '@/components/table/Table';
import { TableColumn } from '@/components/table';
import {User} from "@/interfaces/user";
import {useUsers} from "@/features/admin-panel/hooks/useUsers";

const UsersAdminPage: React.FC = () => {
    const { users, isLoading, isError, error } = useUsers();

    const columns: TableColumn[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' },
        { key: 'lastName', header: 'Apellido' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Teléfono' },
        { key: 'country', header: 'País' },
        { key: 'city', header: 'Ciudad' },
        { key: 'status', header: 'Estado' },
        { key: 'role', header: 'Rol' }
    ];

    // Transform users data to match the table format
    const tableData = users?.map((user: User) => ({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || 'N/A',
        country: user.country?.name || 'N/A',
        city: user.city || 'N/A',
        status: user.status ? 'Activo' : 'Inactivo',
        role: user.role?.name || 'N/A'
    })) || [];

    // Extract content rendering logic into separate functions
    const renderLoadingContent = () => (
        <div className="text-center py-5">
            <div className="spinner-border text-primary">
                <output className="visually-hidden">Cargando...</output>
            </div>
        </div>
    );

    const renderErrorContent = () => (
        <div className="alert alert-danger" role="alert">
            {error?.message || 'Error al cargar los usuarios. Por favor, intente nuevamente.'}
        </div>
    );

    const renderSuccessContent = () => (
        <div className="card border-0 shadow-sm mb-6">
            <div className="card-header bg-white py-4">
                <h5 className="mb-0">Lista de Usuarios</h5>
            </div>
            <div className="card-body">
                {(users?.length || 0) === 0 ? (
                    <p className="text-center py-4">No hay usuarios para mostrar.</p>
                ) : (
                    <Table columns={columns} data={tableData} />
                )}
            </div>
        </div>
    );

    // Determine which content to render based on state
    const renderContent = () => {
        if (isLoading) {
            return renderLoadingContent();
        }

        if (isError) {
            return renderErrorContent();
        }

        return renderSuccessContent();
    };

    return (
        <div className="col-lg-9">
            <div className="user-panel-wrapper">
                <h3 className="n4-clr fw_700 mb-xxl-10 mb-6">Administración de Usuarios</h3>
                {renderContent()}
            </div>
        </div>
    );
};

export default UsersAdminPage;