export const validateBody = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'El cuerpo de la petición no puede estar vacío' });
    }
    next();
}

export const validateRequiredFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: 'Campos requeridos faltantes', 
                missingFields 
            });
        }
        next();
    };
}

export const validateEmail = (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (req.body.email && !emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: 'Formato de email inválido' });
    }
    next();
}

export function validateAge(req, res, next) {
    const { age } = req.body;
    if (age !== undefined && (age < 0 || age > 120)) {
      return res.status(400).json({
        status: 'error',
        message: 'La edad debe estar entre 0 y 120 años'
      });
    }
    next();
}

export function validateObjectId(req, res, next) {
    const { id } = req.params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
        status: 'error',
        message: 'ID inválido'
        });
    }
    next();
}