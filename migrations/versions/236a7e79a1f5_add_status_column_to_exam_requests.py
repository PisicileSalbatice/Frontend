"""Add status column to exam_requests

Revision ID: 236a7e79a1f5
Revises: 59b014db565d
Create Date: 2025-01-13 20:46:35.240002

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '236a7e79a1f5'
down_revision: Union[str, None] = '59b014db565d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Adaugă coloana 'status' în tabela 'exam_requests'
    op.add_column('exam_requests', sa.Column('status', sa.String(), server_default='pending', nullable=False))

    # Modificări generate automat
    op.alter_column('users', 'email',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('users', 'password',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('users', 'role',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_constraint('users_email_key', 'users', type_='unique')
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)


def downgrade() -> None:
    # Elimină coloana 'status' din tabela 'exam_requests'
    op.drop_column('exam_requests', 'status')

    # Modificări generate automat
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.create_unique_constraint('users_email_key', 'users', ['email'])
    op.alter_column('users', 'role',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('users', 'password',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('users', 'email',
               existing_type=sa.VARCHAR(),
               nullable=False)
